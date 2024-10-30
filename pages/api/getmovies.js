import { mongooseConnect } from "@/lib/mongoose";
import { Movie } from "@/models/Movie";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method === "POST") {
    const {
      title,
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
      status
    } = req.body;

    const movieData = await Movie.create({
        title,
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
        status
    })

    res.json(movieData)
  }
  if(method === 'GET'){
    if(req.query?.id) {
        res.json(await Movie.findById(req.query.id))

    }else {
        res.json((await Movie.find()).reverse)
    }
  }
 //UPDATE REQ
 if(method === 'PUT') {
    const {_id,
        title,
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
        status
      } = req.body;

      await Movie.updateOne({_id},{
        title,
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
        status
      });
      res.json(true);
        
}
  
  //DELETE REQ
  if(method === 'DELETE') {
    if(req.query?.id) {
        await Movie.deleteOne({_id:req.query?.id});
        res.json(true);

    }
  }
}
