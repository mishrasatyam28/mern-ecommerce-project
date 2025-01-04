import ProductFilter from "@/components/shopping-view/filter"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { fetchAllFilteredProducts } from "@/store/shop/product-slice"
import { ArrowUpDown } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


const ShoppingListing = () => {

  const {id} = useId()
  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.shopProducts)
  const [filters, setFilters] = useState({}) 
  const [sort, setSort] = useState(null);

  function handleSort(value){
    console.log(value, "sort value check")
    setSort(value)
  }

  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption)

    let cpyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]:[getCurrentOption],
      }
    } else {
      const indexOfCurrentSection = cpyFilters[getSectionId].indexOf(getCurrentOption)

      if (indexOfCurrentSection == -1) {
        cpyFilters[getSectionId].push(getCurrentOption)
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentSection,1)
      }
    }
    setFilters(cpyFilters)
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters))
  }

  // useEffect
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {} )
  },[])
  
  // fetch list of products
  useEffect(() => {
   dispatch(fetchAllFilteredProducts())
 },[dispatch])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter}/>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList?.length} products</span>
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowUpDown className="h-4 w-4" />
              <span>Sort by</span>
            </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
          </DropdownMenu> 
          </div>
        </div>
        {/* product listing start from  here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            productList && productList.length > 0 ?
            productList.map(productItem=><ShoppingProductTile key={productItem._id} product={productItem}/>):null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing

// 6 : 20