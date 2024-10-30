
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Movie(
    {
        _id,
    }
) {
 
    const[redirect, setRedirect] = useState(false);

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [bgposter, setBgposter] = useState('');
    const [smposter, setSmposter] = useState('');
    const [titlecategory, setTitlecategory] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [duration, setDuration] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState([]);
    const [language, setLanguage] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [size, setSize] = useState('');
    const [quaility, setQuaility] = useState('');
    const [youtubelink, setYoutubelink] = useState('');
    const [category, setCategory] = useState('');
    const [watchonline, setWatchonline] = useState('');
    const [downloadlink, setDownloadlink] = useState({
        "480p": "",
        "720p": "",
        "1080p": "",
        "4k": "",
    });
    const [showInputs, setShowInputs] = useState({
        "480p": false,
        "720p": false,
        "1080p": false,
        "4k": false,
    });
    const [status, setStatus] = useState('');

    // function for create movie
 async function createMovie(ev) {
    ev.preventDefault();
    const data = {title,
        slug,
        bgposter,
        smposter,
        titlecategory,
        description,
        rating,
        duration,
        year,
        genre,
        language,
        subtitle,
        size,
        quaility,
        youtubelink,
        category,
        watchonline,
        downloadlink,
        status,}


        if(_id){
            await axios.put('/api/getmovies', {...data, _id})
        }else {
            await axios.post('/api/getmovies',data);
        }
        
        setRedirect(true);
 }

 if(redirect){
    router.push('/')
    return null;
 }

    // download link function
    const resolutions = ["480p", "720p", "1080p", "4k"];

    const handleInputChange = ( resolution, value) =>{
        setDownloadlink(prevstate =>({
            ...prevstate,
            [resolution] :value

        }))
    } 

    const toggleInputVisibility = resolution => {
        setShowInputs(prevstate => ({
            ...prevstate,
            [resolution]: !prevstate[resolution]
        }))
    }


    // slug function
const handleSlugChange = (ev) =>{
    const inputValue = ev.target.value;

    const newSlug = inputValue.replace(/\s+/g, '-');

    setSlug(newSlug)
}

// movie category
const categories = ["Bollywood", "Hollywood", "South", "Marvel_Studio", "Tv_shows", "Web_series"];

    return <>
        <Head>
            <title>Add Movie page</title>
        </Head>
       
  <form className="addmovieform" onSubmit={createMovie}>
    {/* preview bgposter and smposter image */}
     
     <div className="w-100 flex gap-3 mt-1">
         {bgposter ? <div className="bgposter flex flex-col w-70 flex-left">
              <img src={bgposter} id="prv" alt="image"/>
              <label htmlFor="prv" className="w-100">Background image Preview</label>
             </div> : null}
         {smposter ? <div className="smposter flex flex-col w-33 flex-left">
              <img src={smposter} id="prv" alt="image"/>
              <label htmlFor="prv" className="w-100">smposter preview img</label>
             </div> : null}
     </div>


  <div className="formdata w-100 flex flex-sb mt-3 flex-left">
 {/* background image */}
    <div className="w-50 flex flex-col flex-left">
        <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="bgposter">Background Poster</label>
        <input type="text"
         id="bgposter"
         placeholder="Bgposter image link"
         value={bgposter}
         onChange={ev => setBgposter(ev.target.value)}/>
    </div>

     {/* title movie */}
        <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="title">Movie Title</label>
        <input type="text"
         id="title"
         placeholder="title"
         value={title}
         onChange={ev => setTitle(ev.target.value)}/>
    </div>
     {/* title description */}
        <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="description">Description</label>
        <textarea type="text"
         id="description"
         placeholder="description"
         value={description}
         onChange={ev => setDescription(ev.target.value)}/>
    </div>

     {/* rating movie */}
        <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="title">Rating</label>
        <input type="number"
         id="rating"
         placeholder="rating"
         value={rating}
         onChange={ev =>{
            let newValue = ev.target.value <= 10.0 ? ev.target.value : 10.0;
            newValue = newValue >=0 ? newValue : 0;
            setRating(newValue);
         }}
          step="0.1"
          max="10.0"
          min="0"
         />
    </div>

{/* duration movie */}
<div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="duration">Duration</label>
        <input type="text"
         id="duration"
         placeholder="duration"
         value={duration}
         onChange={ev => setDuration(ev.target.value)}/>
    </div>

{/* watchonline movie */}
<div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="watchonline">Watchonline link</label>
        <input type="text"
         id="watchonline"
         placeholder="watchonline"
         value={watchonline}
         onChange={ev => setWatchonline(ev.target.value)}/>
    </div>

{/* downloadlink movie */}
<div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="downloadlink">Downloadlink</label>
       <div className="flex gap-1">
        <div className={showInputs['480p'] ? 'dresolbtn active' : 'dresolbtn'} onClick={() => toggleInputVisibility('480p')}>
            {showInputs['480p'] ? 'Hide 480p' : 'Show 480p'}
        </div>

        <div className={showInputs['720p'] ? 'dresolbtn active' : 'dresolbtn'} onClick={()=> toggleInputVisibility('720p')}>
            {showInputs['720p'] ? 'Hide 720p' : 'Show 720p'}
        </div>

        <div className={showInputs['1080p'] ? 'dresolbtn active' : 'dresolbtn'} onClick={() => toggleInputVisibility('1080p')}>
            {showInputs['1080p'] ? 'Hide 1080p' : 'Show 1080p'}
        </div>

        <div className={showInputs['4k'] ? 'dresolbtn active' : 'dresolbtn'} onClick={() => toggleInputVisibility('4k')}>
            {showInputs['4k'] ? 'Hide 4k' : 'Show 4k'}
        </div>
       </div>
       {resolutions ? <>{resolutions.map(resolution => (
         <div key={resolution} className="w-100"> 
         {showInputs[resolution] && (
            <>
            <input type="text"
            id={`donwloadlink${resolution}`}
            placeholder={`${resolution} Download link`}
            value={downloadlink[resolution]}
            onChange={ev => handleInputChange(resolution, ev.target.value)}

            />
            
            </>
         )}

         </div>

       ))}</> :  null}
    </div>


    {/* status movie */}

    <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="status">Status</label>
        <div className="flex gap-05">
            <input type="radio"
            id="draft"
            name="status"
            value="draft"
            checked={status === "draft"}
            onChange={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="draft">Draft</label>
        </div>
        <div className="flex gap-05">
            <input type="radio"
            id="publish"
            name="status"
            value="publish"
            checked={status === "publish"}
            onChange={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="publish">Publish</label>
        </div>
    </div>








    </div>
    


 {/* right side */}
 <div className="w-50 flex flex-col flex-left">

{/* small poster */}
<div className="w-100 flex flex-col flex-left mb-2">
    <label htmlFor="smposter">Main Poster</label>
    <input type="text"
    id="smposter"
    placeholder="smposter image link"
    value={smposter}
    onChange={ev => setSmposter(ev.target.value)}
    />
</div>



{/*  movie slug url  */}
<div className="w-100 flex flex-col flex-left mb-2">
    <label htmlFor="slug">Slug (url)</label>
    <input type="text"
    id="slug"
    placeholder="Url of the movie"
    value={slug}
    onChange={handleSlugChange}
    />
</div>

{/*  relese movie  */}
<div className="w-100 flex flex-col flex-left mb-2">
    <label htmlFor="year">Release Year</label>
    <input type="text"
    id="year"
    placeholder="year"
    value={year}
    onChange={ev => setYear(ev.target.value)}
    />
</div>


{/* youtube embed video link */}
<div className="w-100 flex flex-col flex-left mb-2">
    <label htmlFor="youtubelink">youtubelink</label>
    <input type="text"
    id="youtubelink"
    placeholder="youtubelink"
    value={youtubelink}
    onChange={ev => setYoutubelink(ev.target.value)}
    />
</div>

{/* language of movie */}

<div className="w-100 flex flex-col flex-left mb-2">
    <label htmlFor="language">Language</label>
    <select onChange={(e) =>setLanguage(e.target.value)} value={language} name="language" id="language">
        <option value="">Select Language</option>
        <option value="Hindi (ORG)">Hindi (ORG)</option>
        <option value="English">English</option>
        <option value="Hindi - English">Hindi - English</option>
        <option value="Dual Audio [Hindi (ORG) + English">Dual Audio [Hindi (ORG) + English</option>
        <option value="Dual Audio [Hindi (Cleaned) + English">Dual Audio [Hindi (Cleaned) + English</option>
    </select>
   
</div>

{/* Quaility  */}

<div className="w-100 flex flex-col flex-left mb-2">
    <label htmlFor="quaility">Movie Quaility</label>
    <select onChange={(e) =>setQuaility(e.target.value)} value={quaility}  name="quaility" id="quaility">
        <option value="">Select Quaility</option>
        <option value="480p || 720p || 1080p - WEB-DL">480p || 720p || 1080p - WEB-DL</option>
        <option value="480p || 720p || 1080p || 2160p - WEB-DL">480p || 720p || 1080p || 2160p - WEB-DL</option>
        <option value="480p || 720p || 1080p - HDTC">480p || 720p || 1080p - HDTC</option>
        
    </select>
</div>


{/* subtitle */}

<div className="w-100 flex flex-col flex-left mb-2">
    <label htmlFor="subtitle">Movie subtitle</label>
    <select onChange={(e) =>setSubtitle(e.target.value)} value={subtitle}  name="quaility" id="subtitle">
        <option value="">Select subtitle</option>
        <option value="Hindi">Hindi</option>
        <option value="English">English</option>
    </select>
</div>


{/* size of movie */}
<div className="w-100 flex flex-col flex-left mb-2">
    <label htmlFor="size">Movie Size</label>
    <input type="text"
    id="size"
    placeholder="350MB || 1GB || 2GB || 4GB"
    value={size}
    onChange={ev => setSize(ev.target.value)}
    />
</div>



  
<div className="moviecategory flex flex-sb flex-left">
     {/*category title movie  */}
    <div className="w-50 flex flex-col flex-left mb-2">
        <label>Title Category :</label>
        {['Movies','Series','Shows'].map((cat)=>(
  <div key={cat} className="flex gap-05"> 
    <input type="radio"
    id={cat.toLowerCase()}
    name="titlecategory"
    value={cat.toLowerCase()}
    checked={titlecategory === cat.toLowerCase()}
    onChange={(e) => setTitlecategory(e.target.value)}

    />
    <label htmlFor={cat.toLowerCase()}>{cat}</label>
  </div>

     ))}
    </div>
     {/* category movie */}
    <div className="w-50 flex flex-col flex-left mb-2">
        <label>Category :</label>
        {categories.map((cat)=>(
  <div key={cat} className="flex gap-05"> 
    <input type="radio"
    id={cat.toLowerCase()}
    name="category"
    value={cat.toLowerCase()}
    checked={category === cat.toLowerCase()}
    onChange={(e) => setCategory(e.target.value)}

    />
    <label htmlFor={cat.toLowerCase()}>{cat}</label>
  </div>
    ))}
    </div>


{/* movie genre */}



<div className="w-50 flex flex-col flex-left mb-2">
        <label>Genre :</label>
        {['Action','Adventure', 'Animation', 'Comedy', 'Drama', 'Crime', 'Fantasy', 'Horror', 'Romance', 'Thriller', 'Science_Fiction'].map((genreOption)=>(
       <label key={genreOption} className="flex gap-05">
        <input type="checkbox"
            value={genreOption.toLowerCase()}
            checked={genre.includes(genreOption.toLowerCase())}
            onChange={(e) => {
                const selectedGenre = e.target.value;
                setGenre((preGenre) => {
                    if(preGenre.includes(selectedGenre)) {
                   return preGenre.filter((genre)=>
                    genre !== selectedGenre)
                    }else {
                        return[...preGenre, selectedGenre]

                    }
                })
            }}
        />

        {genreOption}
       </label>
    ))}
    </div>


</div>
 </div>
  </div>

{/* save button  */}


<div className="w-100 mb-2">
    <button type="submit" className="w-100 flex-center">SAVE DATA</button>
</div>

  </form>


    </>
}

