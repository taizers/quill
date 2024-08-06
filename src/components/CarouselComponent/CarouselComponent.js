import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { ProductService } from '../../utils/service';

import './flags.css';
import { defaultCurrentPage, defaultLimit, defaultMaxPage, responsiveOptions } from '../../constants';

const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return null;
    }
};

const productTemplate = (product) => {
    return (
        <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
            <div className="mb-3">
                <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} className="w-6 shadow-2" />
            </div>
            <div>
                <h4 className="mb-1">{product.name}</h4>
                <h6 className="mt-0 mb-3">${product.price}</h6>
                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                    <Button icon="pi pi-search" className="p-button p-button-rounded" />
                    <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                </div>
            </div>
        </div>
    );
};

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

    return (
        <div className='card'>
            <Carousel
                value={products} 
                numScroll={1} 
                numVisible={3} 
                responsiveOptions={responsiveOptions} 
                itemTemplate={productTemplate} 
                page={currentCarouselItemNumber}
                onPageChange={(e) => setCurrentCarouselItemNumber(e.page)}
            />
        </div>
      )
};

export default CarouselComponent;
