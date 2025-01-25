import { useToast } from "@/hooks/use-toast"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { setProductDetails } from "@/store/shop/product-slice"
import { StarIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {

    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const {toast} = useToast()
    
    function handleAddToCart(getCurrentProductId) {
        console.log(getCurrentProductId)
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
          .then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchCartItems(user?.id))
            }
            toast({
              title:'Product is added to cart'
            })
          } 
        )
    }
    
    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails())
    }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
          <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-[70vw]:">
              <div className="relative overflow-hidden rounded-lg">
                  <img
                      src={productDetails?.image}
                      alt={productDetails?.title}
                      width={600}
                      height={600}
                      className="aspect-square w-full object-cover"
                  />
              </div>
              <div className="">
                  <div className="">
                      <h1 className="text-3xl font-extralight">{productDetails?.title}</h1>
                      <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                  </div>
                  {/* price */}
                  <div className="flex items-center justify-between">
                      <p className={`text-3xl font-bold text-primary${productDetails?.salePrice > 0 ? 'line-through' : ''}`}>${productDetails?.price}</p>
                      {
                          productDetails?.salePrice > 0 ?
                          <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p> : null
                      }
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                      </div>
                      <span className="text-muted-foreground">(4.5)</span>
                  </div>
                  {/* buttons */}
                  <div className="mt-5 mb-5">
                      <Button onClick={()=>handleAddToCart(productDetails?._id)} className="w-full">Add to Cart</Button>
                  </div>
                  <Separator/>
                  {/* review */}
                  <div className="max-h-[300px] overflow-auto">
                      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                      <div className="grid gap-6">
                          <div className="flex gap-4">
                              <Avatar>
                                  <AvatarFallback>
                                      SM
                                  </AvatarFallback>
                              </Avatar>
                              <div className="grid gap-1">
                                  <div className="flex items-center gap-2">
                                      <h3 className="font-bold">Satyam Mishra</h3>
                                  </div>
                                  {/* comment */}
                                  <div className="flex items-center gap-0.5">
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                  </div>
                                  <p>This is an awesome product</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <Avatar>
                                  <AvatarFallback>
                                      SM
                                  </AvatarFallback>
                              </Avatar>
                              <div className="grid gap-1">
                                  <div className="flex items-center gap-2">
                                      <h3 className="font-bold">Satyam Mishra</h3>
                                  </div>
                                  {/* comment */}
                                  <div className="flex items-center gap-0.5">
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                  </div>
                                  <p>This is an awesome product</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <Avatar>
                                  <AvatarFallback>
                                      SM
                                  </AvatarFallback>
                              </Avatar>
                              <div className="grid gap-1">
                                  <div className="flex items-center gap-2">
                                      <h3 className="font-bold">Satyam Mishra</h3>
                                  </div>
                                  {/* comment */}
                                  <div className="flex items-center gap-0.5">
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                      <StarIcon className="w-5 h-5 fill-primary"/>
                                  </div>
                                  <p>This is an awesome product</p>
                              </div>
                          </div>
                      </div>
                      {/*  */}
                      <div className="flex mt-6 gap-2">
                          <Input placeholder="Write a review..." />
                          <Button>Submit</Button>
                      </div>
                  </div>
              </div>
                 
        </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog
