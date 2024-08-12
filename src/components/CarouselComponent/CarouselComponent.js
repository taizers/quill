import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import CarouselItemTemplate from '../CarouselItemTemplate';
import { ProductService } from '../../utils/service';

import './flags.css';
import { defaultCurrentPage, defaultLimit, defaultMaxPage, responsiveOptions } from '../../constants';

const CarouselComponent = () => {
    const [products, setProducts] = useState([]);
    const [currentCarouselItemNumber, setCurrentCarouselItemNumber] = useState(defaultCurrentPage);
    const [limit, setLimit] = useState(defaultLimit);
    const [currentPage, setCurrentPage] = useState(defaultCurrentPage);

    const getProducts = async(page) => {
        const startPosition = page * limit;
        const endPosition = startPosition + limit;

        const data = await ProductService.getProducts();

        return data.slice(startPosition, endPosition)
    }

    useEffect(() => {
        const startPosition = currentPage;
        const endPosition = limit * 2;

        ProductService.getProducts().then((data) => setProducts([...data.slice(startPosition, endPosition)]));
    }, []);

    const changeCarousel = async (prevCarouselPage, carouselPage) => {
        if (carouselPage > prevCarouselPage && currentPage < defaultMaxPage) {
          if (carouselPage <= products.length && carouselPage >= products.length-4) {
            const previosProducts = products.slice(limit, products.length);

            const newProducts = await getProducts(currentPage+2);
            setProducts([...previosProducts, ...newProducts]);
            
            setCurrentCarouselItemNumber(carouselPage - limit);
            setCurrentPage(currentPage+1);
            return;
          }
        }
      
        if (carouselPage < prevCarouselPage && currentPage > defaultCurrentPage) {
          if (carouselPage >= 0 && carouselPage < 2) {
            const previosProducts = products.slice(0, -limit);

            const newProducts = await getProducts(currentPage-1);
            setProducts([...newProducts, ...previosProducts,]);
      
            setCurrentCarouselItemNumber(carouselPage + limit);
            setCurrentPage(currentPage-1);
            return;
          }
        }

        setCurrentCarouselItemNumber(carouselPage)
      };

    const onCarouselChangePage = async (evt) =>{
        if (currentCarouselItemNumber !== evt.page) {
            await changeCarousel(currentCarouselItemNumber, evt.page);
        }
    };

    return (
        <div className='card'>
            <Carousel
                value={products} 
                numScroll={1} 
                numVisible={3} 
                responsiveOptions={responsiveOptions} 
                itemTemplate={CarouselItemTemplate} 
                page={currentCarouselItemNumber}
                onPageChange={onCarouselChangePage}
            />
        </div>
      )
};

export default CarouselComponent;
