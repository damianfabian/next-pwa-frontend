// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
import { ProductArray, ProductAttribute, ProductFooterProps, ProductHeaderProps, ProductItemProps, ProductListProps } from './product';

export type User = {
  id: number
  name: string
}

export type {
  ProductArray,
  ProductAttribute,
  ProductFooterProps, 
  ProductHeaderProps, 
  ProductItemProps, 
  ProductListProps
}