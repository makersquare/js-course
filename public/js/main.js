var markovView = new MarkovView('#container');
var wikiRequestView = new WikiRequestView('#container', markovView);
var pageRequestView = new PageRequestView('#container', markovView);
var corpusRequestView = new CorpusRequestView('#container', markovView);