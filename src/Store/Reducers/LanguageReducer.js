//TODO:charger ces valeurs depuis package.json
const defaultState={
    value:'fr'
}

function LanguageReducer(state=defaultState,action){
    let nextState;
    switch(action.type){
        case 'CHANGE_LANGUAGE':
            nextState={
                ...state
            };
            nextState.value=action.value;
            return nextState;
        default:
            return state;
    }
}
export default LanguageReducer;