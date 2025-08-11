import NbuRate from "../types/NbuRate";

class RatesModel {
    static #instance: RatesModel|null = null;
    static get instance(): RatesModel {
        if(RatesModel.#instance == null) {
            RatesModel.#instance = new RatesModel();
        }
        return RatesModel.#instance;
    }
    rates: Array<NbuRate> = [];
}

export default RatesModel;