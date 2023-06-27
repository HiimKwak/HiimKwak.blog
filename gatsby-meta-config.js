/**
 * @typedef {Object} Links
 * @prop {string} github Your github repository
 */

/**
 * @typedef {Object} MetaConfig
 * @prop {string} title Your website title
 * @prop {string} description Your website description
 * @prop {string} author Maybe your name
 * @prop {string} siteUrl Your website URL
 * @prop {string} lang Your website Language
 * @prop {string} utterances Github repository to store comments
 * @prop {Links} links
 * @prop {string} favicon Favicon Path
 */

/** @type {MetaConfig} */
const metaConfig = {
  title: "Dev Kwak",
  description: `개발자 곽민규의 블로그`,
  author: "Mingyu Kwak",
  siteUrl: "https://hiimkwak.blog/",
  lang: "ko",
  utterances: "hiimkwak/HiimKwak.github.io-comment",
  links: {
    github: "https://github.com/hiimkwak/HiimKwak.github.io",
  },
  favicon: "src/images/icon.png",
}

// eslint-disable-next-line no-undef
module.exports = metaConfig
