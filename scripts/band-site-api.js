class BandSiteApi{
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    }

    async postComment(comment){
        const url = (`${this.baseURL}/comments/?api_key=${this.apiKey}`);
        const response = await axios.post(url, comment);
        return response;
    }

    async getComments(){
        const url = (`${this.baseURL}/comments/?api_key=${this.apiKey}`);
        let response = await axios.get(url);
        response = (response.data).reverse();
        return response;
    }

    async getShows(){
        const url = (`${this.baseURL}/showdates/?api_key=${this.apiKey}`);
        const response = await axios.get(url);
        return response.data;
    }
}

