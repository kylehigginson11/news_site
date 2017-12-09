#!/bin/bash

yuicompressor styles/news_site.css > styles/news_site.min.css
yuicompressor scripts/article_section.js > scripts/article_section.min.js
yuicompressor scripts/load_articles.js > scripts/load_articles.min.js
yuicompressor scripts/modal.js > scripts/modal.min.js
yuicompressor scripts/navbar.js > scripts/navbar.min.js
yuicompressor scripts/football_centre.js > scripts/football_centre.min.js
