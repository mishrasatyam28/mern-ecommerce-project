import { shoppingViewHeaderMenuItems } from '@/config'
import { logoutUser } from '@/store/auth-slice'
import { fetchCartItems } from '@/store/shop/cart-slice'
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import UserCartWrapper from './cart-wrapper'



function MenuItems(){
  return (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        shoppingViewHeaderMenuItems.map(menuItem => <Link className='text-sm font-medium' key={menuItem.id} to={menuItem.path}>
        {menuItem.label}
        </Link>
        )
      }
    </nav>
  )
}

function HeaderRightContent() {
  const { user } = useSelector(state => state.auth)
  const {cartItems} = useSelector((state)=>state.shopCart)
  const [openCartSheet, setOpenCartSheet] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch])
  console.log(cartItems, "CAart")

  return (
    <div className="flex flex-col lg:items-center lg:flex-row gap-4">
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
      <Button onClick={()=>setOpenCartSheet(true)} variant="outline" size="icon">
        <ShoppingCart className='h-6 w-6' /> 
        <span className='sr-only'>User cart</span>
        </Button>
        <UserCartWrapper
        cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='bg-black'>
            <AvatarFallback className="bg-black text-white font-extrabold">
              {/* {user?.userName[0].toUpperCase()} */}
              {user && user.userName ? user.userName[0].toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
            <UserCog className='mr-2 h-4 w-4' />
            Acoount
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const ShoppingHeader = () => {

  
  const { isAuthenticated } = useSelector(state => state.auth)
  return (
      <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className='flex items-center gap-2'>
          <HousePlug className='h-6 w-6' />
          <span className='font-bold'>Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className='h-6 w-6'/>
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent/>
          </SheetContent>
        </Sheet>

{/* large devices */}
        <div className="hidden lg:block">
         <MenuItems/>
        </div>

           <div className="hidden lg:block">
            <HeaderRightContent/>
            </div> 
        
      </div>
    </header>
  )
}
