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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
var axios_1 = require("axios");
var collection_url = "http://localhost:5000/api/collections";
var product_url = "http://localhost:5000/api/products";
var collections = [
    {
        title: "Laptop",
        description: "Your next work buddy",
        image: "https://i.pinimg.com/1200x/97/22/7f/97227f94ad4415049f45d0012abee7ef.jpg",
    },
    {
        title: "Phone",
        description: "To connect with your loved ones",
        image: "https://i.pinimg.com/1200x/60/1e/d6/601ed6b47bb0406a2ce6db4e10698b02.jpg",
    },
    {
        title: "Speaker",
        description: "Play music in style",
        image: "https://i.pinimg.com/736x/ae/fa/e0/aefae0481aba8d6a550885cc7cd53857.jpg",
    },
];
exports.products = [
    {
        name: "MacBook Pro M3",
        description: "Apple's latest MacBook Pro powered by the M3 chip for blazing fast performance and all-day battery life.",
        category: "Laptop",
        price: 199900,
        images: ["https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.nO6fRoxbmIjfghEynf60NwHaE8%3Fpid%3DApi&sp=1773116216Tc2e58e07b6da10eb5e11f0387b7e7af06de94476392b56acb11452e00a28e9de"],
        createdAt: new Date()
    },
    {
        name: "Dell XPS 15",
        description: "Premium Windows laptop with stunning OLED display, powerful Intel processor, and sleek aluminum design.",
        category: "Laptop",
        price: 175000,
        images: ["https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.4u38tWNHWB_3npuBjtMSmgHaEK%3Fpid%3DApi&sp=1773116249Tefd21c58c4ca848faf4390b2a581c688499c94499f74dbf070e65690361508f9"],
        createdAt: new Date()
    },
    {
        name: "ASUS ROG Zephyrus G14",
        description: "High-performance gaming laptop with Ryzen processor and RTX graphics in a compact chassis.",
        category: "Laptop",
        price: 165000,
        images: ["https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.fygbAgnAGOuIWxLKc2JvAQHaEK%3Fpid%3DApi&sp=1773116387T4cbcd5f98d824dbba740849b256f73a6f46955171ea766c7e1180259fa9b92a3"],
        createdAt: new Date()
    },
    {
        name: "Lenovo Legion 5 Pro",
        description: "Powerful gaming laptop with high refresh rate display and RTX graphics for serious gaming performance.",
        category: "Laptop",
        price: 145000,
        images: ["https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.fygbAgnAGOuIWxLKc2JvAQHaEK%3Fpid%3DApi&sp=1773116387T4cbcd5f98d824dbba740849b256f73a6f46955171ea766c7e1180259fa9b92a3"],
        createdAt: new Date()
    },
    {
        name: "iPhone 15 Pro",
        description: "Apple flagship smartphone with titanium body, A17 chip, and advanced camera system.",
        category: "Phone",
        price: 134900,
        images: [],
        createdAt: new Date()
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        description: "Samsung's premium flagship phone featuring a powerful Snapdragon processor and a 200MP camera.",
        category: "Phone",
        price: 129999,
        images: [],
        createdAt: new Date()
    },
    {
        name: "Google Pixel 8 Pro",
        description: "AI-powered smartphone with exceptional camera performance and pure Android experience.",
        category: "Phone",
        price: 106999,
        images: [],
        createdAt: new Date()
    },
    {
        name: "OnePlus 12",
        description: "Flagship killer smartphone with Snapdragon processor, fast charging, and smooth OxygenOS experience.",
        category: "Phone",
        price: 64999,
        images: [],
        createdAt: new Date()
    },
    {
        name: "Sony SRS-XG300",
        description: "Portable Bluetooth speaker delivering powerful bass and long battery life.",
        category: "Speaker",
        price: 27990,
        images: [],
        createdAt: new Date()
    },
    {
        name: "JBL Charge 5",
        description: "Waterproof portable speaker with powerful sound and built-in power bank.",
        category: "Speaker",
        price: 17999,
        images: [],
        createdAt: new Date()
    },
    {
        name: "Bose SoundLink Flex",
        description: "Compact premium Bluetooth speaker with balanced sound and rugged portability.",
        category: "Speaker",
        price: 15900,
        images: [],
        createdAt: new Date()
    },
    {
        name: "Marshall Emberton II",
        description: "Stylish portable speaker with rich sound signature and long battery life.",
        category: "Speaker",
        price: 18999,
        images: [],
        createdAt: new Date()
    }
];
function populateCollection() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i, c, res, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    _a = collections;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    c = _c;
                    return [4 /*yield*/, axios_1.default.post(collection_url, c)];
                case 2:
                    res = _d.sent();
                    console.log("Inserted: ", res.data.name);
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Collections populated successfully!");
                    process.exit();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _d.sent();
                    console.error("Error populating collections: ", error_1);
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function populateProduct() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i, p, res, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    _a = exports.products;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    p = _c;
                    return [4 /*yield*/, axios_1.default.post(product_url, p)];
                case 2:
                    res = _d.sent();
                    console.log("Inserted: ", res.data.name);
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Products populated successfully!");
                    process.exit();
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _d.sent();
                    console.error("Error populating products: ", error_2);
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
populateCollection();
populateProduct();
