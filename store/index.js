export const state= () => ({
    selectedPage: '',
    searchStatus: false,
})

export const getters = {
    selectedPage: state => state.selectedPage,
    searchStatus: state => state.searchStatus
}

export const actions = {
    selectedPage (context, payload ) {
        context.commit("selectedPage", payload);
    },
    searchStatus (context, payload ) {
        context.commit("searchStatus", payload);
    }
}

export const mutations = {
    selectedPage (state, payload) {
        state.selectedPage = payload;
    },
    searchStatus (state, payload) {
        state.searchStatus = payload;
    }
}