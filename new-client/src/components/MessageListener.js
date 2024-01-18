import { getServerResponseObject } from "./MapServerHandler";

const getWindowMessage = (socket) => (event) => {
    console.log("incoming windows message")
    const request = {
        type: 'request',
        component: 'custom-data',
        action: null,
        sid: event.data.message.id,
    };

    switch (event.data.id) {
        case 'tabAdr':
            request.action = 'get-addresses-from-database';
            break;
        case 'tabPnd':
            request.action = 'get-buildings-from-database';
            break;
        case 'tabVbo':
            request.action = 'get-residence-from-database';
            break;
        case 'tabPrs':
            request.action = 'get-persons-from-database';
            break;
        case 'tabBdf':
            request.action = 'get-companies-from-database';
            break;
        // case 'marker':
        //     // store.dispatch('createMarker', {
        //     //     coords: event.data.message.coordsArray,
        //     //     entType: event.data.message.entType,
        //     // });
        //     // displayNavigationButton(event.data.message.coordsArray);
        //     break;
        // case 'markerLdf':
        //     // store.dispatch('createMarker', {
        //     //     coords: event.data.message.coordsArray,
        //     //     entType: event.data.message.entType,
        //     // });
        //     break;
        // case 'ldf':
        //     // store.dispatch('ldf', event.data);
        //     break;
        // case 'removeResults':
        //     // store.dispatch('removeAllResults');
        //     break;
        // case 'fill-contextmenu-subitems':
        //     // store.dispatch('setContextMenuSubItems', event.data.message);
        //     break;
        // case 'set-inzicht-settings':
        //     // store.dispatch('setInzichtSettings', event.data.message.settings);
        //     // setUpMapBasedOnInzichtSettings(event.data.message.settings);
        //     break;
        default:
            break;
    }
    // emit message to server-map
    if (request.action){
        socket.emit('message', request)
    }
    // getServerResponseObject(event.data.id, null)
};

export default getWindowMessage;