"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lorem_ipsum_1 = require("lorem-ipsum");
const productModel_1 = __importDefault(require("../models/productModel"));
// brought to you by the lorem-ipsum package
const lorem = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: {
        max: 6,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 8,
    },
});
//  randomize numbers for how many words, paragraphs, rating, reviews, price for a product
function randomizer() {
    const numOfWordsForTitle = Math.floor(Math.random() * 3 + 1);
    const numOfParagraphForDetials = Math.floor(Math.random() * 2 + 1);
    const price = Math.floor(Math.random() * 100 + 10).toFixed(2);
    const rating = (Math.random() * 5 + 1).toFixed(2);
    const reviews = Math.floor(Math.random() * 40 + 3);
    return {
        numOfWordsForTitle,
        numOfParagraphForDetials,
        price,
        rating: +rating >= 5 ? "5" : rating,
        reviews,
    };
}
function productGenertor(numberOfItems) {
    return __awaiter(this, void 0, void 0, function* () {
        // loop for generating products depending on passed argument
        for (let i = 0; i < numberOfItems; i++) {
            try {
                // get random image source from loremflicker.com
                const data = yield axios_1.default.get("https://loremflickr.com/320/240/product");
                const { numOfWordsForTitle, numOfParagraphForDetials, price, rating, reviews } = randomizer();
                // create new product
                const newProduct = new productModel_1.default({
                    image: data.request.res.responseUrl,
                    title: lorem.generateWords(numOfWordsForTitle),
                    description: lorem.generateParagraphs(numOfParagraphForDetials),
                    price: price,
                    rating: rating,
                    reviews: reviews,
                });
                // save created product to DB
                yield newProduct.save();
            }
            catch (error) {
                console.log(error);
            }
        }
    });
}
exports.default = productGenertor;
