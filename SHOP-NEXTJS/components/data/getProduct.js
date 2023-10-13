



export const productData = 
async () => {
      const resGet = await fetch(`${NEXT_API}/api/products`, {
        method: "GET",
      });
    
      const dataPos = await resGet.json();
    
      if (!resGet.ok) {
        console.log("Loi la ", JSON.stringify(dataPos));
      } else {
        return dataPos.products;
      }
    };