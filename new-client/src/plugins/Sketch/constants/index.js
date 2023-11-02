import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import SaveIcon from "@mui/icons-material/Save";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import SettingsIcon from "@mui/icons-material/Settings";

export const ACTIVITIES = [
  {
    id: "ADD",
    tooltip: "Voeg nieuwe objecten toe.",
    information:
      "Voeg objecten toe door op de kaart te tekenen. Begin hieronder met het" +
      "kiezen van het type object dat u wilt tekenen.",
    icon: <EditIcon />,
  },
  {
    id: "EDIT",
    tooltip: "Bewerk bestaande objecten.",
    information:
      "Bewerk nodes, wijzig de tekenvolgorde of wijzig de kleur van getekende" +
      "objecten.",
    icon: <FormatShapesIcon />,
  },
  {
    id: "MOVE",
    tooltip: "Verplaats bestaande objecten.",
    information:
      "Klik op het object op de kaart dat u wilt verplaatsen om de " +
      "verplaatsingmodus te activeren. Sleep het object vervolgens naar de " +
      "juiste locatie.",
    icon: <OpenWithIcon />,
  },
  {
    id: "DELETE",
    tooltip: "Verwijder objecten.",
    information:
      "Klik op het object dat u wilt verwijderen, of klik op de onderstaande" +
      "knop om alle objecten te verwijderen.",
    icon: <DeleteIcon />,
  },
  {
    id: "SAVE",
    tooltip: "Objecten bewaren.",
    information:
      "Bewaar de objecten en ga later verder. Houd er rekening mee dat alleen " +
      "objecten die zichtbaar zijn op d ekaart worden opgeslagen. .",
    icon: <SaveIcon />,
  },
  {
    id: "UPLOAD",
    tooltip: "Download of upload objecten",
    information:
      "Download of upload objecten in .KML-formaat. Gebruik de " +
      "onderstaande knoppen of sleep een .KML-bestand rechtstreeks naar de " +
      "kaart. ",
    icon: <ImportExportIcon />,
  },
  {
    id: "SETTINGS",
    tooltip: "Instellingen.",
    information: "Hier kunt u de instellingen van het de teken-tool wijzigen.",
    icon: <SettingsIcon />,
  },
];

export const DRAW_COLORS = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
  "#354FAD",
];

export const DRAW_TYPES = [
  {
    type: "Circle",
    label: "Cirkel",
    tooltip:
      "Teken een circel op de kaart door één keer te klikken waar de circel moet" +
      " beginnen, vervolgens naar de gewenste grootte te slepen en los te laten.",
  },
  {
    type: "LineString",
    label: "Lijn",
    tooltip:
      "Teken een lijn in de kaart door één keer per knooppunt te klikken, " +
      "eindig een dubbelklik.",
  },
  {
    type: "Rectangle",
    label: "Rechthoek",
    tooltip:
      "Teken een rechthoek op de kaart door eenmaal te klikken waar de rechthoek" +
      " moet beginnen, sleep vervolgens naar de gewenste grootte en laat los.",
  },
  {
    type: "Arrow",
    label: "Pijl",
    tooltip:
      "Teken een pijl in de kaart door één keer per knooppunt te klikken, " +
      "eindig met een dubbelklik.",
  },
  {
    type: "Select",
    label: "Selecteer op de kaart",
    tooltip:
      "Klik op een bestaand object op de kaart en kopieer het naar de tekenlaag.",
  },
  {
    type: "Polygon",
    label: "Polygon",
    tooltip:
      "Teken een polygoon op de kaart door één keer per knooppunt te klikken, " +
      "eindig met een dubbelklik.",
  },
  {
    type: "Point",
    label: "Punt",
    tooltip:
      "Voeg een punt in de kaart in door te klikken op de plek waar u het punt " +
      "wilt hebben.",
  },
  {
    type: "Text",
    label: "Tekst",
    tooltip:
      "Voeg tekst in de kaart in door te klikken op de plek waar u de " +
      "tekst wilt hebben.",
  },
];

export const MAX_REMOVED_FEATURES = 4;
export const PLUGIN_MARGIN = 10;

export const STROKE_TYPES = [
  {
    type: "solid",
    label: "Ononderbroken",
    tooltip: "Ononderbroken lijn.",
  },
  {
    type: "dotted",
    label: "Stippellijn",
    tooltip: "Stippellijn (stippen).",
  },
  {
    type: "dashed",
    label: "Stippellijn",
    tooltip: "Stippellijn (strepen).",
  },
];

export const STROKE_DASHES = new Map([
  ["solid", null],
  ["dotted", [2, 7]],
  ["dashed", [12, 7]],
]);

// A constant stating how many sketches we're allowed to save in local-storage.
export const MAX_SKETCHES = 3;

export const DEFAULT_MEASUREMENT_SETTINGS = {
  showText: false,
  showArea: false,
  showLength: false,
  showPerimeter: false,
  areaUnit: "AUTO",
  lengthUnit: "AUTO",
  precision: 0,
};

export const STORAGE_KEY = "sketch";

// How many characters we allow the user to save in LS.
export const MAX_LS_CHARS = 1e6;

export const PROMPT_TEXTS = {
  saveOverflow:
    "De items konden niet worden opgeslagen. Werkruimte voor veel objecten.",
  saveNoFeatures: "Kan canvas niet maken, geen tekenobjecten gevonden.",
  saveSuccess: "De werkruimte werd zonder problemen opgeslagen.",
  CircleHelp:
    "U kunt een cirkel maken door met een ingestelde straal te klikken, of te " +
    "slepen om de gewenste straal te krijgen.",
  LineStringHelp:
    "Maak lijnen door voor elk knooppunt op een positie te klikken en eindig met" +
    " dubbelklikken.",
  RectangleHelp:
    "Maak een rechthoek door met de linkermuisknop te klikken en over een gebied" +
    " te slepen om de gewenste grootte te krijgen.",
  ArrowHelp:
    "Er wordt een pijl gemaakt door voor elk knooppunt op een positie te " +
    "klikken, en eindig met een dubbelklik.",
  SelectHelp:
    "Klik op een bestaand object op de kaart en kopieer het naar de tekenlaag.",
  PolygonHelp:
    "Maak een polygoon door voor elk knooppunt op een positie te klikken en " +
    "eindig met een dubbelklik.",
  PointHelp: "Klik op een positie om een ​​punt in te voegen.",
  TextHelp: "Klik op een positie om tekst in te voegen.",
  EDITHelp:
    "Klik op een object om het uiterlijk of de tekenvolgorde te wijzigen.",
  MOVEHelp: "Klik op een object om het te verplaatsen.",
  DELETEHelp: "Klik op een object om het uit uw schets te verwijderen.",
  SAVEHelp:
    "Hier kunt u een werkruimte opslaan om later verder te werken. Als u een " +
    "oudere werkruimte wilt opslaan, voert u dezelfde naam in.",
};

export const AREA_MEASUREMENT_UNITS = [
  { type: "AUTO", name: "Automatisch" },
  { type: "M2", name: "Vierkante meter (m²)" },
  { type: "KM2", name: "Vierkante kilometer (km²)" },
  { type: "HECTARE", name: "Hactare (ha)" },
];

export const LENGTH_MEASUREMENT_UNITS = [
  { type: "AUTO", name: "Automatisch" },
  { type: "M", name: "Meter (m)" },
  { type: "KM", name: "Kilometer (km)" },
];

export const MEASUREMENT_PRECISIONS = [
  { value: 0, name: "0 decimalen" },
  { value: 1, name: "1 decimaal" },
  { value: 2, name: "2 decimalen" },
  { value: 3, name: "3 decimalen" },
];

export const DEFAULT_DRAW_STYLE_SETTINGS = {
  strokeColor: { r: 10, g: 10, b: 10, a: 1 },
  fillColor: { r: 60, g: 60, b: 60, a: 0.3 },
  strokeType: "solid",
  strokeWidth: 1,
};

export const DEFAULT_TEXT_STYLE_SETTINGS = {
  foregroundColor: "#FFFFFF",
  backgroundColor: "#000000",
  size: 14,
};
