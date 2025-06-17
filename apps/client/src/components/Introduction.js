import React from "react";
import { createPortal } from "react-dom";
import { Steps } from "intro.js-react";

import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PluginControlButton from "../components/PluginControlButton";

import "intro.js/introjs.css";
import "intro.js/themes/introjs-modern.css";

import { functionalOk as functionalCookieOk } from "../models/Cookie";

/**
 * @summary Renders a guide that introduces new users to features present in Hajk.
 * @description The introduction will only be rendered once. This is achieved by setting
 * a flag in the browser's local storage.
 *
 * @returns React.Component
 */
class Introduction extends React.PureComponent {
  state = {
    forceShow: false, // Used to force showing the Intro, overrides the LocalStorage value
    initialStep: 0,
    stepsEnabled: true,
    steps: [],
  };

  predefinedSteps = [
    {
      title: "Welcome to Hajk! 👋",
      intro:
        "Here is a short guide that will show you around the application. <br /><br />Stay tuned!",
    },
    {
      title: "Toolbar",
      element: "header > div:first-child",
      intro: "Using the button above, you can bring up the tool panel.",
    },
    {
      title: "Search box",
      element: '[class*="searchContainer"]',
      intro:
        "You can find the search box here.<br /><br /> Using the search tool, you can easily find the right place on the map.",
    },
    {
      title: "More search tools",
      element: '[name="searchOptions"]',
      intro: "Under this button you will find more advanced search options.",
    },
    {
      title: "Map controls",
      element: "#controls-column",
      intro:
        "At the far right of the screen are various controls that you use to navigate the map.",
    },
    {
      title: "Window",
      element: '#windows-container > div[style*="display: block"]', // My favorite selector. Selects the first visible Window, so if there's a plugin Window open, we can add intro text to it.
      intro:
        "Each tool draws its own window. You can move the window and change its size by dragging the sides of the window.",
    },
    {
      title: "Widget button",
      element: "#left-column > div > button",
      intro:
        "This is a Widget button. By clicking on it, you will open the tool that the button is linked to. <br><br>That's all. Hope you enjoy using Hajk!",
    },
  ];

  constructor(props) {
    super(props);

    /**
     * When appLoaded is fired, let's filter through the provided 'steps'.
     * We must remove any steps that don't have corresponding DOM elements.
     * Otherwise, we would show intro steps even for non-existing elements,
     * which wouldn't be nice.
     */
    this.props.globalObserver.subscribe("core.appLoaded", () => {
      // Allow a short wait so that everything renders first
      setTimeout(() => {
        // First check if we have any steps in our config
        const { introductionSteps = [] } = this.props;
        // We must have at least 2 elements in the array in order to properly show intro guide
        const steps =
          introductionSteps.length >= 2
            ? this.#tryParsingSteps(introductionSteps)
            : this.predefinedSteps;

        const filteredSteps = steps.filter((s) => {
          return (
            s.element === undefined ||
            document.querySelector(s?.element) !== null
          );
        });

        this.setState({ steps: filteredSteps });
      }, 100);
    });

    this.props.globalObserver.subscribe(
      "core.showIntroduction",
      this.showIntroduction
    );
  }

  #tryParsingSteps(steps) {
    try {
      for (const step of steps) {
        if (!step?.title || !step?.intro) {
          throw Error(
            "Introduction steps missing necessary properties. Please ensure that each step contains at least the 'title' and 'intro' property."
          );
        }
      }
      return steps;
    } catch (error) {
      console.error(error.message);
      return this.predefinedSteps;
    }
  }

  showIntroduction() {
    this.setState({
      initialStep: 0,
      stepsEnabled: true,
      forceShow: true,
    });
  }

  disableSteps = () => {
    // Upon completion/closing, set a flag that won't show this guide again.
    // Remember that the user must allow for functional cookies for this to be possible.
    // If the user has chosen to allow only the required cookies, the introduction will
    // show on every page load.
    if (functionalCookieOk()) {
      window.localStorage.setItem("introductionShown", 1);
    }

    // Reset the state
    this.setState({ forceShow: false, initialStep: 0 });
  };

  // Render a control button that allows the user to invoke the guide on demand
  renderControlButton() {
    return createPortal(
      <PluginControlButton
        icon={<InsertEmoticonIcon />}
        onClick={() => {
          this.showIntroduction();
        }}
        title="Introduction guide"
        abstract="Open guided tour"
      />,
      document.getElementById("plugin-control-buttons")
    );
  }

  render() {
    const { introductionEnabled, introductionShowControlButton } = this.props;
    const { initialStep, steps, stepsEnabled } = this.state;

    return introductionEnabled ? (
      <>
        {introductionShowControlButton && this.renderControlButton()}
        {
          // Don't show unless we have 2 or more elements in array - too short
          // guides are not meaningful!
          steps.length >= 2 &&
            // Show only once per browser, or override if forced by a user action.
            (parseInt(window.localStorage.getItem("introductionShown")) !== 1 ||
              this.state.forceShow === true) && (
              <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={initialStep}
                onExit={this.disableSteps}
                options={{
                  exitOnOverlayClick: false,
                  nextLabel: "Next",
                  prevLabel: "Previous",
                  doneLabel: "Ready!",
                }}
              />
            )
        }
      </>
    ) : null;
  }
}

export default Introduction;
