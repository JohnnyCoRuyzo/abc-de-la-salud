import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Header from './Header';
import MainPageBlogPost from './MainPageBlogPost';
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
        { title: 'Tienda', url: '?q=tienda' },
        { title: 'Videos', url: '?q=videos' },
        { title: 'Blogs', url: '?q=blogs' }
      ],
      mainFeaturedPost: {},
      featuredPosts: [],
      sidebar: {
        title: 'About',
        description:
          'Power by @johnnatanDEV - 2021 | Todos los derechos reservados',
        social: [
          { name: 'Facebook', icon: FacebookIcon, url: "https://facebook.com/abcdelasalud" },
          { name: 'Instagram', icon: InstagramIcon, url: "https://www.instagram.com/abcdelasalud/" }
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
          "blogs": [
            {
                "source": {
                    "id": "",
                    "name": ""
                },
                "author": "John Ruiz",
                "title": "Primer Blog",
                "description": "Resumen del primer blog escrito, que trata sobre como llevar una vida más plena.",
                "url": "/blog/1",
                "urlToImage": "https://www.thehindu.com/business/Industry/4d93sd/article33526584.ece/ALTERNATES/LANDSCAPE_615/thnak2021-01-05T150310Z868199197RC2R1L9MOVLJRTRMADP3CRYPTO-CURRENCIES-FLOW",
                "publishedAt": "2021-05-16T11:08:000",
                "content": ""
            },
            {
                "source": {
                    "id": "",
                    "name": ""
                },
                "author": "John Ruiz",
                "title": "Segundo Blog",
                "description": "Resumen del segundo blog escrito, que trata sobre como calmar la migraña.",
                "url": "/blog/2",
                "urlToImage": "https://www.thehindu.com/business/Industry/4d93sd/article33526584.ece/ALTERNATES/LANDSCAPE_615/thnak2021-01-05T150310Z868199197RC2R1L9MOVLJRTRMADP3CRYPTO-CURRENCIES-FLOW",
                "publishedAt": "2021-05-16T11:08:000",
                "content": ""
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
        <Header title="ABC DE LA SALUD" sections={this.state.sections} />
        <main>
          <Grid container spacing={4}>
            {this.state.featuredPosts.map((post, index) => (
              index !== 0? 
              <MainPageBlogPost key={post.title} post={post} /> : ''
            ))}
          </Grid>
          <Grid container spacing={5} className={this.state.classes.mainGrid}>
            <Sidebar
              title={this.state.sidebar.title}
              description={this.state.sidebar.description}
              social={this.state.sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="ABC DE LA SALUD" description="" />
    </React.Fragment>
  )};
}

export default MainPage;