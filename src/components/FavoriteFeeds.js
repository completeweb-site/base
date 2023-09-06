import React, { useState, useEffect } from "react";
import useSiteMetadata from "../hooks/SiteMetadata";
import Layout from "../components/siteLayout";
import { Helmet } from "react-helmet";
import TimeAgo from "react-timeago";
import userRssData from "../util/userRss.json";
import Menu from "../components/menu"
import useNetlifyIdentity from '../components/useNetlifyIdentity';

const createExcerpt = (text, maxLength) => {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  const trimmedText = text.substr(0, maxLength);

  return trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" "))) + "...";
};

const FavoriteFeeds = () => {
  const { showNav } = useSiteMetadata();
  const { showDates } = useSiteMetadata();
  const { postcount } = useSiteMetadata();
  const [favorites, setFavorites] = useState([]);
  const [feed, setFeed] = useState([]);
  const [visibleItems, setVisibleItems] = useState(postcount || 10); // default value of 10

  const [loggedIn, setLoggedIn] = useState(false);
  useNetlifyIdentity(setLoggedIn);

  const combinedFeed = [
    ...favorites,
    ...feed.filter((item) => !favorites.some((fav) => fav.link === item.link)),
  ];

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (item) => {
    const newFavorites = [...favorites];

    if (favorites.some((favorite) => favorite.link === item.link)) {
      // If the item is already in favorites, remove it
      const index = newFavorites.findIndex((favorite) => favorite.link === item.link);
      newFavorites.splice(index, 1);
    } else {
      // Otherwise, add the item to favorites
      newFavorites.push(item);
    }

    setFavorites(newFavorites);

    // Save the new favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    // Update the favorite status of the item in the feed
    const newFeed = feed.map((feedItem) => {
      if (feedItem.link === item.link) {
        return { ...feedItem, favorite: !feedItem.favorite };
      }
      return feedItem;
    });

    setFeed(newFeed);
  };

  useEffect(() => {
    const fetchRssFeed = async (rssFeed) => {
      const response = await fetch(rssFeed.rssFeedUrl);
      const text = await response.text();
      const xml = new DOMParser().parseFromString(text, "text/xml");
      const items = xml.querySelectorAll("item");

      return Array.from(items).map((item) => {
        const mediaContent = item.getElementsByTagName("media:content")[0];
        const imageUrl = mediaContent ? mediaContent.getAttribute("url") : null;

        return {
          name: rssFeed.name,
          title: item.querySelector("title")?.textContent || "",
          link: item.querySelector("link")?.textContent || "",
          description: item.querySelector("description")?.textContent || "",
          pubDate: item.querySelector("pubDate")?.textContent || "",
          imageUrl: imageUrl,
          favorite: false,
        };
      });
    };

    const fetchAllFeeds = async () => {
      if (typeof window !== "undefined") {
        const feedPromises = userRssData.rssFeeds.map((feed) => fetchRssFeed(feed));
        const allFeeds = await Promise.all(feedPromises);
        const mergedFeed = [].concat(...allFeeds);

        // Sort the merged feeds by their pubDate in descending order (most recent first)
        const sortedFeed = mergedFeed.sort((a, b) => {
          return new Date(b.pubDate) - new Date(a.pubDate);
        });

        setFeed(sortedFeed);
      }
    };

    fetchAllFeeds();
  }, []);


  

  const showMoreItems = () => {
    setVisibleItems(visibleItems + postcount);
  };

  return (
    <>
        <Helmet>
          <body id="body" className="social" />
        </Helmet>

        {showNav ? (
        <div className="spacer" style={{ height: "70px", border: "0px solid yellow" }}></div>
      ) : (
        ""
      )}
{/* <h1 style={{ position: 'relative', zIndex: '1', margin: '0 auto', textAlign:'center' }}>My Timeline:</h1> */}
<div className='flexbutt' style={{}}> 

<div className="post-card controlpanel sidebarMenuInner" style={{display:'flex', flexDirection:'column', height:'100vh', minWidth:'1%', position:'fixed', alignItems:'center', justifyContent:'center', padding:'1vh 0', zIndex:'2'}}>

<div style={{textAlign:'right', writingMode:'vertical-rl', textOrientation:'mixed', position:'absolute', top:'', right:'5px'}}><h3>Profile</h3></div>



{loggedIn ? (
    <ul style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',}}><Menu /></ul>
              ) : (
                <ul style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',}}><Menu /></ul>
              )}



</div>


<div className="contentpanel grid-container" style={{ marginTop: "1rem" }}>
          <div className="sliderSpacer" style={{ height: "", paddingTop: "", display: "" }}></div>



          {/* {combinedFeed.slice(0, visibleItems).map((item, index) => ( */}
          {favorites.slice(0, visibleItems).map((item, index) => (

          <div className="post-card1" style={{ justifyContent: "end", alignItems: "center", position:'relative' }} key={index}>




  <a className="postlink" href={item.link} rel="noopener noreferrer">
    {item.imageUrl && (
      <img className="featured-image1" src={item.imageUrl} alt={item.title} style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }} />
    )}

    <div className="post-content" style={{display:'flex', flexDirection:'column', justifyContent:'end', width:'100%', height:'', position:'relative', background:'', padding:'0', margin:'0 auto 0 auto', textAlign:'center', overFlow:'hidden'}}>
      
      <div className="panel" style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center', margin:'10px auto', maxWidth:'80vw', gap:'.4vw', height:'', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', color:'#aaa' }}>
      {/* <h2 onClick={() => toggleFavorite(item)}>
  {item.favorite ? "⭐" : "☆"} {item.name} - {item.title}
</h2> */}










<h2 style={{textAlign:'left', textWrap:'balance'}}>
  {item.name} - {item.title}
</h2>
<p style={{textAlign:'left', textWrap:'balance', fontSize:'85%'}}>
      {createExcerpt(item.description, 200)}
    </p>
      </div>

      {/* {showDates ? ( */}
        <p style={{position:'', textAlign:'center', border:'0px solid red', fontSize:'70%', minWidth:'100px'}}>
          <TimeAgo date={item.pubDate} />
        </p>
      {/* ) : (
        ""
      )} */}
    </div>
  </a>
  {!item.favorite && (
  <button
    className="star-button"
    onClick={(event) => {
      event.preventDefault();
      toggleFavorite(item);
    }}
    style={{ cursor: "pointer", background: "none", border: "none", position:'relative', top:'-10px', right:'10px', zIndex:'' }}
  >
    ☆
  </button>
)}
{item.favorite && (
  <button
    className="star-button"
    onClick={(event) => {
      event.preventDefault();
      toggleFavorite(item);
    }}
    style={{ cursor: "pointer", background: "none", border: "none", position:'relative', top:'-10px', right:'10px', zIndex:'' }}
  >
    ⭐
  </button>
)}
</div>

          

          
        ))}



{visibleItems < feed.length && (
            
            <div className="post-card11" style={{ justifyContent: "center", alignItems: "center" }}><button className="post-card11" style={{ justifyContent: "center", alignItems: "center", verticalAlign:'center', width:'500px', height:'500px', display:'flex', border:'1px solid red', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', border:'0px solid red', color:'#aaa' }} onClick={showMoreItems}>
            Show more
          </button></div>
            
          )}
{visibleItems === feed.length && (
  <div className="post-card1" style={{ justifyContent: "center", alignItems: "center" }}><div className="post-card11" style={{ justifyContent: "center", alignItems: "center", verticalAlign:'center', width:'500px', height:'500px', display:'flex', border:'1px solid red', textAlign:'center', padding:'1vh 2vw', fontSize:'clamp(1rem, 1vw, 1rem)',  background:'rgba(0, 0, 0, 0.7)', borderRadius:'', border:'0px solid red', color:'#aaa' }} onClick={showMoreItems}>End of Results Reached</div></div>
)}




        
      </div>
      </div>
      </>

  );
};


export default FavoriteFeeds;



