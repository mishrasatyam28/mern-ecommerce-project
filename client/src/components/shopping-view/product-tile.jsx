import { brandOptionsMap, categoryOptionsMap } from "@/config"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"

const ShoppingProductTile = ({ product, handleGetProductDetails,handleAddtoCart }) => {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div onClick={()=>handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    {
                        product?.salePrice > 0 ? (
                        <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">Sale</Badge>) : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold">{product?.title}</h2>
                    {/* product category and brand */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-base text-muted-foreground">
                            {categoryOptionsMap[product?.category]}
                        </span>
                        <span className="text-base text-muted-foreground">
                            {brandOptionsMap[product?.brand]}
                        </span>
                    </div>

                    {/* product price and salePrice */}
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''}text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ?
                                <span className="text-lg font-semibold text-primary">${product?.salePrice}
                                </span> : null    
                        }
                        
                    </div>
                </CardContent>
                
            </div>
            <CardFooter>
                    <Button onClick={()=>handleAddtoCart(product?._id)} className="w-full">
                        Add to  cart
                    </Button>
                </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile


