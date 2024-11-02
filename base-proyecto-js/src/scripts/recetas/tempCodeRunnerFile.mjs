
    const res=await fetch('https://dummyjson.com/recipes')
    const  recetas  = await res.json();

   console.log(recetas);
    

    recetas.forEach (receta=> {})