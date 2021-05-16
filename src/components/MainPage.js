import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';

const prod = false;

function validateUTF8(string) {
  var utf8 = /([\x00-\x7F]|([\xC2-\xDF]|\xE0[\xA0-\xBF]|\xED[\x80-\x9F]|(|[\xE1-\xEC]|[\xEE-\xEF]|\xF0[\x90-\xBF]|\xF4[\x80-\x8F]|[\xF1-\xF3][\x80-\xBF])[\x80-\xBF])[\x80-\xBF])*/g;
  return string === null || string === undefined? false: string.split('').every(char => char.match(utf8)[0].length > 0);
}

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

Date.prototype.toShortFormat = function(daysToAdd) {

  let monthNames =["Jan","Feb","Mar","Apr",
                    "May","Jun","Jul","Aug",
                    "Sep", "Oct","Nov","Dec"];
  
  let date = new Date();
  date = date.addDays(daysToAdd);

  let day = date.getDate();
  
  let monthIndex = date.getMonth();
  let monthName = monthNames[monthIndex];
  
  let year = date.getFullYear();
  
  return `${day}-${monthName}-${year}`;  
}

Date.prototype.toSearchableFormat = function(daysToAdd) {
  let date = new Date();
  date = date.addDays(daysToAdd);
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

class MainPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      classes: makeStyles((theme) => ({
        mainGrid: {
          marginTop: theme.spacing(3),
        },
      })),
      sections: [
        { title: 'Bitcoin', url: '?q=bitcoin' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Technology', url: '?q=technology' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Design', url: '?q=design' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Culture', url: '?q=culture' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Business', url: '?q=business' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Politics', url: '?q=politics' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Opinion', url: '?q=opinion' + "&from=" + Date.prototype.toSearchableFormat(0)},
        { title: 'Science', url: '?q=science' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Health', url: '?q=health'  + "&from=" + Date.prototype.toSearchableFormat(0)},
        { title: 'Style', url: '?q=style' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Travel', url: '?q=travel' + "&from=" + Date.prototype.toSearchableFormat(0) },
      ],
      mainFeaturedPost: {},
      featuredPosts: [],
      sidebar: {
        title: 'About',
        description:
          'This is a web app, made by @johnnatandev on React, this site uses the template at https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/blog and the public API library of https://newsapi.org/',
        archives: [
          { title: Date.prototype.toShortFormat(0), url: "&from=" + Date.prototype.toSearchableFormat(0) },
          { title: Date.prototype.toShortFormat(-1), url: "&from=" + Date.prototype.toSearchableFormat(-1) },
          { title: Date.prototype.toShortFormat(-2), url: "&from=" + Date.prototype.toSearchableFormat(-2) },
          { title: Date.prototype.toShortFormat(-3), url: "&from=" + Date.prototype.toSearchableFormat(-3) },
          { title: Date.prototype.toShortFormat(-4), url: "&from=" + Date.prototype.toSearchableFormat(-4) },
          /*{ title: 'September 1999', url: '#' },
          { title: 'August 1999', url: '#' },
          { title: 'July 1999', url: '#' },
          { title: 'June 1999', url: '#' },
          { title: 'May 1999', url: '#' },
          { title: 'April 1999', url: '#' },*/
        ],
        social: [
          { name: 'GitHub', icon: GitHubIcon, url: "https://github.com/JohnnyCoRuyzo" },
          { name: 'Instagram', icon: InstagramIcon, url: "https://www.instagram.com/johnnatandev/" },
          { name: 'LinkedIn', icon: LinkedInIcon, url: "https://linkedin.com/in/johnnatanruizsanchez" },
        ],
      },
    }
    
  }

  componentDidMount(){
    //
    let extensionUrl = document.baseURI.replace(window.location.protocol + "//" + window.location.host + '/','');
    if(extensionUrl === ''){
      window.location.href = window.location.protocol + "//" + window.location.host + '?q=bitcoin&from='+Date.prototype.toSearchableFormat(0);
    }
    else{
      let searchTerm = extensionUrl;
      if(prod == false){
        fetch("https://newsapi.org/v2/everything" + searchTerm + "&sortBy=publishedAt&apiKey=def59b2c8beb4495896b7bd46a19ca4a", {
          "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            mainFeaturedPost: response.articles.filter(elem => validateUTF8(elem.description) && validateUTF8(elem.title))[0],
            featuredPosts: response.articles.filter(elem => validateUTF8(elem.description) && validateUTF8(elem.title)),
          });
        })
        .catch(err => { console.log(err); 
        });
      }
      else{
        let response = {
          "status": "ok",
          "totalResults": 84,
          "articles": [
              {
                  "source": {
                      "id": "the-hindu",
                      "name": "The Hindu"
                  },
                  "author": "AP",
                  "title": "Bitcoin crosses $40,000 mark, doubling in less than a month",
                  "description": "Nothing’s new with the digital currency in the month since it crossed $20,000 — there's been no major change in how it can be used.",
                  "url": "https://www.thehindu.com/business/Industry/bitcoin-crosses-40000-mark-doubling-in-less-than-a-month/article33526585.ece",
                  "urlToImage": "https://www.thehindu.com/business/Industry/4d93sd/article33526584.ece/ALTERNATES/LANDSCAPE_615/thnak2021-01-05T150310Z868199197RC2R1L9MOVLJRTRMADP3CRYPTO-CURRENCIES-FLOW",
                  "publishedAt": "2021-01-08T05:54:03Z",
                  "content": "First it went through $20,000. Then 10 days later, it broke through $25,000, and then, with barely taking a breath, it crossed $30,000. Now only a few days into 2021, the price of bitcoin has crossed… [+2079 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Sozcu.com.tr"
                  },
                  "author": "Sözcü",
                  "title": "Bitcoin’de yeni zirve 40 bin 180 dolar",
                  "description": "Başta kurumsal alımlar olmak üzere, kripto para piyasalarına artan yönelimin etkisiyle, en yüksek hacimli birim Bitcoin 40.180.37 dolar ile yeni zirveye tırmanırken, piyasa hacmi de 700 milyar doları aştı. Bitcoin son 24 saatte yüzde 2.84 artışla 38,535.74 do…",
                  "url": "https://www.sozcu.com.tr/2021/ekonomi/bitcoinde-yeni-zirve-40-bin-180-dolar-6202295/",
                  "urlToImage": "https://i.sozcu.com.tr/wp-content/uploads/2021/01/08/iecrop/shutterstock_1698227716_16_9_1610085010-670x371.jpg",
                  "publishedAt": "2021-01-08T05:52:11Z",
                  "content": "Bata kurumsal almlar olmak üzere, kripto para piyasalarna artan yönelimin etkisiyle, en yüksek hacimli birim Bitcoin 40.180.37 dolar ile yeni zirveye trmanrken, piyasa hacmi de 700 milyar dolar at.\r\n… [+1190 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Nos.nl"
                  },
                  "author": null,
                  "title": "Wekdienst 8/1: OMT buigt zich over lockdown • Ministerraad bijeen",
                  "description": "Goedemorgen! De ministerraad komt bijeen om te praten over het coronavirus en de kinderopvangtoeslagaffaire. En het OMT, dat het kabinet adviseert, bespreekt naar alle waarschijnlijkheid de verlenging van de huidige lockdown. \nEerst is het nog bewolkt, met na…",
                  "url": "https://nos.nl/l/2363482",
                  "urlToImage": "https://cdn.nos.nl/image/2021/01/08/705167/xxl.jpg",
                  "publishedAt": "2021-01-08T05:44:34Z",
                  "content": "Ga je de weg op? Hier vind je het overzicht van de files en werkzaamheden. Check hier de dienstregeling voor het spoor.\r\nWat kun je vandaag verwachten?\r\n<ul><li>De ministerraad komt bijeen. Het gespr… [+1530 chars]"
              },
              {
                  "source": {
                      "id": "wirtschafts-woche",
                      "name": "Wirtschafts Woche"
                  },
                  "author": "Christof Schürmann",
                  "title": "Börsenwoche 288 - Grafik: Es wird wieder gezockt",
                  "description": "Die Bitcoin-Hausse ist getrieben von Spekulation. Ob diese aufgehen wird, ist ungewiss. Höhere Preise sind aber sogar wahrscheinlich.",
                  "url": "https://www.wiwo.de/my/dossiers/boersenwoche/boersenwoche-288-grafik-es-wird-wieder-gezockt/26770514.html",
                  "urlToImage": "https://www.wiwo.de/images/bit_imago/26774802/2-format11240.jpg",
                  "publishedAt": "2021-01-08T05:40:05Z",
                  "content": "Für Nachrichtenseiten wie WirtschaftsWoche Online sind Anzeigen eine wichtige Einnahmequelle. Mit den Werbeerlösen können wir die Arbeit unserer Redaktion bezahlen und Qualitätsartikel kostenfrei ver… [+173 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Patronlardunyasi.com"
                  },
                  "author": null,
                  "title": "Bitcoin, 40 bin doları aşarak zirveyi yeniledi",
                  "description": "Toplam piyasa değeri ilk kez 1 milyarın üzerine çıkan kripto para piyasasının en büyük oyuncusu Bitcoin, zirveyi 40 bin doların üzerine taşıdı.",
                  "url": "https://www.patronlardunyasi.com/haber/Bitcoin-40-bin-dolari-asarak-zirveyi-yeniledi/245285",
                  "urlToImage": "http://www.patronlardunyasi.com/haber_resim/Bitcoin%2DTL%2Dbazinda%2Drekor%2Dkirdi%2DFiyati%2D100%2Dbin%2Dlira%2D%2D241888%2Ejpg",
                  "publishedAt": "2021-01-08T05:37:51Z",
                  "content": "Kripto para piyasalarnn en yüksek hacimli paras Bitcoin, 40 bin dolar aarak rekor tazeledi.\r\nBitcoin'in Paypal'n kripto paralar ödeme arac olarak kabul edeceini açklamasnn ardndan balayan yükselii, k… [+813 chars]"
              },
              {
                  "source": {
                      "id": "handelsblatt",
                      "name": "Handelsblatt"
                  },
                  "author": "Anis Mičijević",
                  "title": "Börse am 8. Januar: Sechs Punkte, die für Anleger heute wichtig sind",
                  "description": "Gewalttätige Proteste von Trump-Anhängern lösen in Washington Chaos aus, doch die Kurse in Frankfurt und New York steigen. Und: Das Bitcoin-Fieber ist wieder da.",
                  "url": "https://www.handelsblatt.com/finanzen/maerkte/marktberichte/boerse-am-8-januar-sechs-punkte-die-fuer-anleger-heute-wichtig-sind/25957402.html",
                  "urlToImage": "https://www.handelsblatt.com/images/dax-kurve/22874410/186-format2003.jpg",
                  "publishedAt": "2021-01-08T05:34:55Z",
                  "content": "Düsseldorf Die Rekordjagd am deutschen Aktienmarkt dürfte sich am Freitag fortsetzen: Der deutsche Leitindex könnte gleich zum Start ein neuen Rekord aufstellen. Auf außerbörslichen Handelsplattforme… [+1350 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "newsBTC"
                  },
                  "author": "Aayush Jindal",
                  "title": "TA: Ethereum Corrects $200: Why ETH Remains Attractive Near 100 SMA",
                  "description": "Ethereum traded to a new yearly high at $1,280 before correcting lower against the US Dollar. ETH price declined over $200, but the bulls were active near the 100 hourly simple moving average. Ethereum gained pace above $1,200 and it traded to a new multi-mon…",
                  "url": "https://www.newsbtc.com/analysis/eth/ethereum-eth-remains-attractive-near-100-sma/",
                  "urlToImage": "https://www.newsbtc.com/wp-content/uploads/2021/01/shutterstock_1029670141.jpg",
                  "publishedAt": "2021-01-08T05:28:29Z",
                  "content": "Ethereum traded to a new yearly high at $1,280 before correcting lower against the US Dollar. ETH price declined over $200, but the bulls were active near the 100 hourly simple moving average.\r\n<ul><… [+2320 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Nyheder.tv2.dk"
                  },
                  "author": "Steffen Neupert, Tina Camilla Moesgaard",
                  "title": "Bitcoin sætter rekorder, men nogen kommer til at tabe penge, forudser økonom",
                  "description": "Selvom der kan være mange penge at tjene på Bitcoin, vil nogen altid tabe penge på investeringen, siger investeringsøkonom.",
                  "url": "https://nyheder.tv2.dk/business/2021-01-08-bitcoin-saetter-rekorder-men-nogen-kommer-til-at-tabe-penge-forudser-oekonom",
                  "urlToImage": "https://free-cdn.tv2i.dk/users/editorial/images/61f79733-b4de-4d4c-a411-14db6b1df574.jpg?t%5B%5D=crop%3Ax%3D0%2Cy%3D158%2Cwidth%3D5000%2Cheight%3D2812&t%5B%5D=maxSize%3Aheight%3D720%2Cwidth%3D1280&t%5B%5D=compress%3Alevel%3D82&publicKey=cms-ro&accessToken=2d6580a97e1b884a49a8014eb749bebf49a935786e7cb745dbbb260d97c35ca6",
                  "publishedAt": "2021-01-08T05:21:56Z",
                  "content": "Selvom der kan være mange penge at tjene på Bitcoin, vil nogen altid tabe penge på investeringen, siger investeringsøkonom. Da computere første gang i 2009 begyndte at producere kryptovaluta, var de … [+5370 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Cointelegraph"
                  },
                  "author": "Cointelegraph By Cyrus McNally",
                  "title": "Google searches for 'Ethereum' hit all-time high",
                  "description": "There is currently more interest in Ethereum as a search term than ever before, while most other crypto search terms are less popular now than in 2017/2018.",
                  "url": "https://cointelegraph.com/news/google-searches-for-ethereum-hit-all-time-high",
                  "urlToImage": "https://s3.cointelegraph.com/uploads/2021-01/0d593cd2-df37-4627-81d5-d9e43fd6a303.jpg",
                  "publishedAt": "2021-01-08T05:11:20Z",
                  "content": "More people are searching for the word Ethereum now than ever before in its history. \r\nGoogle Trends reveals that the number of Google searches currently being performed for Ethereum is at an all-tim… [+2258 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Seeking Alpha"
                  },
                  "author": null,
                  "title": "The Reflation Narrative Has Gotten Ahead Of Itself: Harrison",
                  "description": "Market action speaks to the prevalence of the reflation trade, with the dollar down and equities, bond yields, oil prices, gold, and Bitcoin up.",
                  "url": "https://seekingalpha.com/article/4397862-reflation-narrative-gotten-ahead-of-harrison?source=feed_all_articles",
                  "urlToImage": "https://static3.seekingalpha.com/assets/og_image_192-59bfd51c9fe6af025b2f9f96c807e46f8e2f06c5ae787b15bf1423e6c676d4db.png",
                  "publishedAt": "2021-01-08T05:06:36Z",
                  "content": null
              },
              {
                  "source": {
                      "id": null,
                      "name": "NDTV News"
                  },
                  "author": "Associated Press",
                  "title": "Bitcoin Crosses $40,000 Mark, Doubling in Less Than a Month",
                  "description": "Bitcoin price has crossed $40,000 (roughly Rs. 29 lakh) only a few days into 2021. Some investors are now using the notoriously volatile currency as a “store of value,\" that is traditionally a title saved for safe-haven investments like gold and other preciou…",
                  "url": "https://gadgets.ndtv.com/internet/news/bitcoin-price-rally-usd-40000-mark-crossed-doubling-investors-sceptical-2349422",
                  "urlToImage": "https://i.gadgets360cdn.com/large/bitcoin_red_light_reuters_1606795749912.jpg",
                  "publishedAt": "2021-01-08T05:05:02Z",
                  "content": "First it went through $20,000 (roughly Rs. 14.6 lakhs) . Then 10 days later, it broke through $25,000 (roughly Rs. 18.2 lakhs), and then, with barely taking a breath, it crossed $30,000 (roughly Rs. … [+2494 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Lowendbox.com"
                  },
                  "author": "raindog308",
                  "title": "Host Mayo Returns with Low Cost VPS and Shared Hosting Plans! (Shared from $5/year – 1GB VPS from $3.25/mo!)",
                  "description": "Waqass from Host Mayo dropped by to share a nice offer with us: Shared Hosting starting at $5/year! 1GB VPSes for $3.25/mo (with bigger ones available, too!) Last time Host Mayo was on LEB, I subjected our readership to gruesome mayonnaise puns but there’s a …",
                  "url": "https://lowendbox.com/blog/host-mayo-returns-with-low-cost-vps-and-shared-hosting-plans-shared-from-5-year-1gb-vps-from-3-25-mo/",
                  "urlToImage": "https://lowendbox.com/wp-content/uploads/2020/09/hostmayo.png",
                  "publishedAt": "2021-01-08T05:00:20Z",
                  "content": "Waqass from Host Mayo dropped by to share a nice offer with us:\r\n<ul><li>Shared Hosting starting at $5/year!</li><li>1GB VPSes for $3.25/mo (with bigger ones available, too!)</li></ul>Last time Host … [+3493 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "heise online"
                  },
                  "author": "",
                  "title": "NAS sicher betreiben",
                  "description": "Ein rätselhafter Fall: Statt seiner Daten fand unser Leser Gunther J. nur noch ein Erpresserschreiben auf seinem NAS. Er ahnte noch nicht, dass sich der Netzwerkspeicher sein eigenes Datengrab geschaufelt hatte. So kam es dazu – und so schützen Sie sich.",
                  "url": "https://www.heise.de/select/ct/2021/2/2031414513204839849?wt_mc=rss.red.ct.themen.atom.beitrag.beitrag",
                  "urlToImage": "https://www.heise.de/select/ct/2021/2/2031414513204839849/ct0221nas_secur_andreas_martini_112980_rei_a.jpg",
                  "publishedAt": "2021-01-08T05:00:00Z",
                  "content": "Ein rätselhafter Fall: Statt seiner Daten fand unser Leser Gunther J. nur noch ein Erpresserschreiben auf seinem NAS. Er ahnte noch nicht, dass sich der Netzwerkspeicher sein eigenes Datengrab gescha… [+5848 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Www.nzz.ch"
                  },
                  "author": "Michael Schäfer (msf)",
                  "title": "Intakte Chancen – aber nur wenige Sicherheiten im Anlagejahr 2021",
                  "description": "Das an den Finanzmärkten äusserst turbulente Jahr 2020 ist für viele Anleger versöhnlich ausgegangen. Nun macht sich schon wieder viel Optimismus breit. Es gibt jedoch einige Wenn und Aber.",
                  "url": "https://www.nzz.ch/finanzen/aktien/aniagejahr-2021-intakte-chancen-aber-nur-wenige-sicherheiten-ld.1594595",
                  "urlToImage": "https://img.nzz.ch/C=W6342,H3562.09,X0,Y332.455/S=W1200M,H674M/O=75/C=AR1200x674/https://nzz-img.s3.amazonaws.com/2021/1/7/498ceb89-e456-4361-87f7-7c12423c44fb.jpeg?wmark=nzz",
                  "publishedAt": "2021-01-08T05:00:00Z",
                  "content": "Das Reisen in ferne Länder bleibt wegen dem Virus meist ein Traum. Auch an den Börsen wird die Pandemie noch lange ein Thema sein.\r\nEs soll Anleger geben, die auf den guten Rat hören, nur in grossen … [+3874 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Www.is.fi"
                  },
                  "author": null,
                  "title": "Tullilla on kymmenien miljoonien bitcoin-omaisuus",
                  "description": "Vuosi sitten Tullin bitcoin-potin arvo oli noin 15 miljoonaa euroa, nyt noin 60 miljoonaa. Sen arvoa on kartuttanut kurssinousu sekä bitcoinien lisääntyminen.",
                  "url": "https://www.is.fi/digitoday/art-2000007725423.html",
                  "urlToImage": "https://is.mediadelivery.fi/img/some/default/a34a76ddffc94f33a18057ab29da8fb8.jpg",
                  "publishedAt": "2021-01-08T05:00:00Z",
                  "content": "Vuosi sitten Tullin bitcoin-potin arvo oli noin 15 miljoonaa euroa, nyt noin 60 miljoonaa. Sen arvoa on kartuttanut kurssinousu sekä bitcoinien lisääntyminen.Tullilla on hallussaan merkittävä virtuaa… [+1932 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Businessinsider.de"
                  },
                  "author": "Sabrina Frangos",
                  "title": "Twitter hebt Sperre auf, Facebook und Instagram blockieren Trump weiter",
                  "description": "Mark Zuckerberg machte klar, dass Trumps Konten bei Facebook und Instagram bis zur Machtübergabe an Joe Biden blockiert bleiben. Außerdem: Baidu will Elektrofahrzeuge herstellen lassen und SoFi will an die Börse.",
                  "url": "https://www.businessinsider.de/gruenderszene/business/trump-bleibt-bei-facebook-und-instagram-gesperrt/",
                  "urlToImage": "https://cdn.businessinsider.de/wp-content/uploads/2020/11/GettyImages-669889770-2.jpg",
                  "publishedAt": "2021-01-08T04:55:00Z",
                  "content": "Mark Zuckerberg machte klar, dass Trumps Konten bei Facebook und Instagram bis zur Machtübergabe an Joe Biden blockiert bleiben. Außerdem: Baidu will Elektrofahrzeuge herstellen lassen und SoFi will … [+3593 chars]"
              },
              {
                  "source": {
                      "id": "the-times-of-india",
                      "name": "The Times of India"
                  },
                  "author": "ETMarkets.com",
                  "title": "What does commodities guru Jim Rogers tell his daughters about investing",
                  "description": "Rogers, who just authored Street Smarts: Adventures on the Road and in the Markets, said he is worried and thinks it is a terrible time to be young.",
                  "url": "https://economictimes.indiatimes.com/markets/stocks/news/what-does-commodities-guru-jim-rogers-tell-his-daughters-about-investing/articleshow/80165206.cms",
                  "urlToImage": "https://img.etimg.com/thumb/msid-80165175,width-1070,height-580,imgsize-231456,overlay-etmarkets/photo.jpg",
                  "publishedAt": "2021-01-08T04:53:41Z",
                  "content": "NEW DELHI: Marquee investor and commodities guru Jim Rogers says he is trying to teach his daughters that money needs to be saved, and not spent.\r\nIn an interview to ET NOW, he said they would save m… [+2831 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "BusinessLine"
                  },
                  "author": "Reuters",
                  "title": "Asian stocks surge to record highs on hopes for global recovery",
                  "description": "Seoul's Kospi up 2.8 per cent, Nikkei adds 1.73 per cent to hit its highest level since August 1990",
                  "url": "https://www.thehindubusinessline.com/markets/stock-markets/asian-stocks-surge-to-record-highs-on-hopes-for-global-recovery/article33526117.ece",
                  "urlToImage": "https://www.thehindubusinessline.com/markets/stock-markets/ece6jg/article31620312.ece/ALTERNATES/LANDSCAPE_615/asian-sharesjpg",
                  "publishedAt": "2021-01-08T04:33:53Z",
                  "content": "Asian shares rose to record highs on Friday, with Japan's Nikkei hitting a three-decade peak as investors looked beyond rising coronavirus cases and political unrest in the US to focus on hopes for a… [+3538 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Cointelegraph"
                  },
                  "author": "Cointelegraph By Samuel Haig",
                  "title": "Bakkt may go public through rumored $2B merger",
                  "description": "The Intercontinental Exchange-owned Bitcoin futures exchange Bakkt is reportedly deep into merger discussions with a special purpose acquisition company.",
                  "url": "https://cointelegraph.com/news/bakkt-may-go-public-through-rumored-2b-merger",
                  "urlToImage": "https://s3.cointelegraph.com/uploads/2021-01/48476255-31ef-47de-905d-8b24156f5ec6.jpg",
                  "publishedAt": "2021-01-08T04:30:14Z",
                  "content": "Bakkt, the cryptocurrency trading platform majority-owned by Intercontinental Exchange, is rumored to be deep in discussions to go public through a merger with VPC Impact Acquisition Holdings.\r\nOn Ja… [+973 chars]"
              },
              {
                  "source": {
                      "id": null,
                      "name": "Business Standard"
                  },
                  "author": "Reuters",
                  "title": "Asian stocks hit fresh records on hopes for global recovery later in 2021",
                  "description": "Asian shares rose to record highs on Friday as investors looked beyond rising coronavirus cases and political unrest in the US to focus on hopes for an economic recovery later in the year",
                  "url": "https://www.business-standard.com/article/international/asian-stocks-hit-fresh-records-on-hopes-for-global-recovery-later-in-2021-121010800239_1.html",
                  "urlToImage": "https://bsmedia.business-standard.com/_media/bs/img/article/2020-10/02/full/1601606189-397.jpg",
                  "publishedAt": "2021-01-08T04:15:00Z",
                  "content": "By Andrew Galbraith and Imani Moise\r\nSHANGHAI/NEW YORK (Reuters) - Asian shares rose to record highs on Friday, with Japan's Nikkei hitting a three-decade peak as investors looked beyond rising coron… [+3769 chars]"
              }
          ]
      };
        this.setState({
          mainFeaturedPost: response.articles.filter(elem => validateUTF8(elem.description) && validateUTF8(elem.title))[0],
          featuredPosts: response.articles.filter(elem => validateUTF8(elem.description) && validateUTF8(elem.title)),
        });
      }
    }

    
  }

  

  render () {
    return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Breaking News" sections={this.state.sections} />
        <main>
          <MainFeaturedPost post={this.state.mainFeaturedPost} />
          <Grid container spacing={4}>
            {this.state.featuredPosts.map((post, index) => (
              index !== 0? 
              <FeaturedPost key={post.title} post={post} /> : ''
            ))}
          </Grid>
          <Grid container spacing={5} className={this.state.classes.mainGrid}>
            <Sidebar
              title={this.state.sidebar.title}
              description={this.state.sidebar.description}
              archives={this.state.sidebar.archives}
              social={this.state.sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Breaking News" description="" />
    </React.Fragment>
  )};
}

export default MainPage;