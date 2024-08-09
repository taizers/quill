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
    
    useEffect(() => {
        const startPosition = currentPage * limit;
        const endPosition = currentPage === defaultCurrentPage ? limit - 1 : ((currentPage + 1) * limit) - 1;

        ProductService.getProducts().then((data) => setProducts([...products, ...data.slice(startPosition, endPosition)]));
    }, [currentPage]);

    useEffect(() => {
        if (
            (Math.round((products.length - 2) - products.length * 0.25)) <= currentCarouselItemNumber && 
            currentCarouselItemNumber !== defaultCurrentPage &&
            currentPage < defaultMaxPage
        )
        {
            setCurrentPage(currentPage + 1)
        }
    }, [currentCarouselItemNumber]);

    const fn = (prevCarouselPage, nextCarouselPage) => {
        console.log(`prevCarouselPage: ${prevCarouselPage}, nextCarouselPage: ${nextCarouselPage}`);

    }

    const onCarouselChangePage = (evt) =>{
        if (currentCarouselItemNumber !== evt.page) {
            fn(currentCarouselItemNumber, evt.page);
        }

        setCurrentCarouselItemNumber(evt.page)
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
