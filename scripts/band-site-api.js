class BandSiteApi{
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    }

    async postComment(comment){
        const request = (`${this.baseURL}/comments/?api_key=${this.apiKey}`);
        const response = await axios.post(request, comment);
        return response;
    }

    async getComments(){
        const request = (`${this.baseURL}/comments/?api_key=${this.apiKey}`);
        let response = (await axios.get(request)).data;
        response.sort((a, b) => new Date(b.date) - new Date(a.date));
        return response;
    }

    async getShows(){
        const request = (`${this.baseURL}/showdates/?api_key=${this.apiKey}`);
        const response = await axios.get(request);
        return response.data;
    }
}

