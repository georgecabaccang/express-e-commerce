import axios from "axios";
import { LoremIpsum } from "lorem-ipsum";
import Product from "../models/productModel";

// brought to you by the lorem-ipsum package
const lorem = new LoremIpsum({
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
function randomizer(): {
    numOfWordsForTitle: number;
    numOfParagraphForDetials: number;
    price: string;
    rating: string;
    reviews: number;
} {
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

export default async function productGenertor(numberOfItems: number) {
    // loop for generating products depending on passed argument
    for (let i = 0; i < numberOfItems; i++) {
        try {
            // get random image source from loremflicker.com
            const data = await axios.get("https://loremflickr.com/320/240/product");
            const { numOfWordsForTitle, numOfParagraphForDetials, price, rating, reviews } =
                randomizer();

            // create new product
            const newProduct = new Product({
                image: data.request.res.responseUrl,
                title: lorem.generateWords(numOfWordsForTitle),
                description: lorem.generateParagraphs(numOfParagraphForDetials),
                price: price,
                rating: rating,
                reviews: reviews,
            });

            // save created product to DB
            await newProduct.save();
        } catch (error) {
            console.log(error);
        }
    }
}
