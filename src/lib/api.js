"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContentsData = exports.getContentData = exports.getAllContentsStatistics = exports.getContentStatistics = exports.sendEmail = exports.getAllBlogWithViews = exports.getGuestbook = exports.initializeContents = exports.initializeAllContents = void 0;
var nodemailer_1 = require("nodemailer");
var firestore_1 = require("firebase/firestore");
var collections_1 = require("./firebase/collections");
var mdx_1 = require("./mdx");
var mdx_utils_1 = require("./mdx-utils");
var helper_server_1 = require("./helper-server");
var helper_1 = require("./helper");
/**
 * Initialize all blog and projects if not exists in firestore at build time.
 */
function initializeAllContents() {
    return __awaiter(this, void 0, Promise, function () {
        var contentPromises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contentPromises = helper_server_1.VALID_CONTENT_TYPES.map(function (type) {
                        return initializeContents(type);
                    });
                    return [4 /*yield*/, Promise.all(contentPromises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.initializeAllContents = initializeAllContents;
/**
 * Initialize contents with selected content type.
 */
function initializeContents(type) {
    return __awaiter(this, void 0, Promise, function () {
        var contents, contentPromises;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mdx_utils_1.getContentFiles)(type)];
                case 1:
                    contents = _a.sent();
                    contentPromises = contents.map(function (slug) { return __awaiter(_this, void 0, void 0, function () {
                        var snapshot, newContent;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    slug = (0, helper_1.removeContentExtension)(slug);
                                    return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(collections_1.contentsCollection, slug))];
                                case 1:
                                    snapshot = _a.sent();
                                    if (snapshot.exists())
                                        return [2 /*return*/];
                                    newContent = {
                                        type: type,
                                        views: 0,
                                        likes: 0,
                                        likesBy: {}
                                    };
                                    return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(collections_1.contentsCollection, slug), newContent)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(contentPromises)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.initializeContents = initializeContents;
/**
 * Returns all the guestbook.
 */
function getGuestbook() {
    return __awaiter(this, void 0, Promise, function () {
        var guestbookSnapshot, guestbook, parsedGuestbook;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, firestore_1.getDocs)((0, firestore_1.query)(collections_1.guestbookCollection, (0, firestore_1.orderBy)('createdAt', 'desc')))];
                case 1:
                    guestbookSnapshot = _a.sent();
                    guestbook = guestbookSnapshot.docs.map(function (doc) { return doc.data(); });
                    parsedGuestbook = guestbook.map(function (_a) {
                        var createdAt = _a.createdAt, data = __rest(_a, ["createdAt"]);
                        return (__assign(__assign({}, data), { createdAt: createdAt.toJSON() }));
                    });
                    return [2 /*return*/, parsedGuestbook];
            }
        });
    });
}
exports.getGuestbook = getGuestbook;
/**
 * Returns all the blog posts with the views.
 */
function getAllBlogWithViews() {
    return __awaiter(this, void 0, Promise, function () {
        var posts, postsPromises, postsWithViews;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mdx_1.getAllContents)('blog')];
                case 1:
                    posts = _a.sent();
                    postsPromises = posts.map(function (post) { return __awaiter(_this, void 0, void 0, function () {
                        var snapshot, views;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, firestore_1.getDoc)((0, firestore_1.doc)(collections_1.contentsCollection, post.slug))];
                                case 1:
                                    snapshot = _a.sent();
                                    views = snapshot.data().views;
                                    return [2 /*return*/, __assign(__assign({}, post), { views: views })];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(postsPromises)];
                case 2:
                    postsWithViews = _a.sent();
                    return [2 /*return*/, postsWithViews];
            }
        });
    });
}
exports.getAllBlogWithViews = getAllBlogWithViews;
/**
 * Send email to my email address.
 */
function sendEmail(text, session) {
    return __awaiter(this, void 0, Promise, function () {
        var client, _a, name, email, emailHeader;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = (0, nodemailer_1.createTransport)({
                        service: 'Gmail',
                        auth: {
                            user: process.env.EMAIL_ADDRESS,
                            pass: process.env.EMAIL_PASSWORD
                        }
                    });
                    _a = session.user, name = _a.name, email = _a.email;
                    emailHeader = "New guestbook from ".concat(name, " (").concat(email, ")");
                    return [4 /*yield*/, client.sendMail({
                            from: process.env.EMAIL_ADDRESS,
                            to: process.env.EMAIL_TARGET,
                            subject: emailHeader,
                            text: text
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendEmail = sendEmail;
/**
 * Returns the contents statistics with selected content type.
 */
function getContentStatistics(type) {
    return __awaiter(this, void 0, Promise, function () {
        var contentsSnapshot, contents, _a, totalPosts, totalViews, totalLikes;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, firestore_1.getDocs)((0, firestore_1.query)(collections_1.contentsCollection, (0, firestore_1.where)('type', '==', type)))];
                case 1:
                    contentsSnapshot = _b.sent();
                    contents = contentsSnapshot.docs.map(function (doc) { return doc.data(); });
                    _a = contents.reduce(function (_a, _b) {
                        var accPosts = _a[0], accViews = _a[1], accLikes = _a[2];
                        var views = _b.views, likes = _b.likes;
                        return [
                            accPosts + 1,
                            accViews + views,
                            accLikes + likes
                        ];
                    }, [0, 0, 0]), totalPosts = _a[0], totalViews = _a[1], totalLikes = _a[2];
                    return [2 /*return*/, { type: type, totalPosts: totalPosts, totalViews: totalViews, totalLikes: totalLikes }];
            }
        });
    });
}
exports.getContentStatistics = getContentStatistics;
/**
 * Returns all the contents statistics.
 */
function getAllContentsStatistics() {
    return __awaiter(this, void 0, Promise, function () {
        var statisticsPromises, statistics;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    statisticsPromises = helper_server_1.VALID_CONTENT_TYPES.map(function (type) {
                        return getContentStatistics(type);
                    });
                    return [4 /*yield*/, Promise.all(statisticsPromises)];
                case 1:
                    statistics = _a.sent();
                    return [2 /*return*/, statistics];
            }
        });
    });
}
exports.getAllContentsStatistics = getAllContentsStatistics;
/**
 * Returns the content data with selected content type.
 */
function getContentData(type) {
    return __awaiter(this, void 0, Promise, function () {
        var contentsSnapshot, contents, filteredContents, contentData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, firestore_1.getDocs)((0, firestore_1.query)(collections_1.contentsCollection, (0, firestore_1.where)('type', '==', type)))];
                case 1:
                    contentsSnapshot = _a.sent();
                    contents = contentsSnapshot.docs.map(function (doc) { return doc.data(); });
                    filteredContents = contents.map(function (_a) {
                        var slug = _a.slug, views = _a.views, likes = _a.likes;
                        return ({
                            slug: slug,
                            views: views,
                            likes: likes
                        });
                    });
                    contentData = {
                        type: type,
                        data: filteredContents
                    };
                    return [2 /*return*/, contentData];
            }
        });
    });
}
exports.getContentData = getContentData;
/**
 * Returns all the content data.
 */
function getAllContentsData() {
    return __awaiter(this, void 0, Promise, function () {
        var contentDataPromises, contentData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contentDataPromises = helper_server_1.VALID_CONTENT_TYPES.map(function (type) {
                        return getContentData(type);
                    });
                    return [4 /*yield*/, Promise.all(contentDataPromises)];
                case 1:
                    contentData = _a.sent();
                    return [2 /*return*/, contentData];
            }
        });
    });
}
exports.getAllContentsData = getAllContentsData;
