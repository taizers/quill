import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { severity } from '../constants';

const CarouselItemTemplate = (product) => {
    return (
        <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
            <div className="mb-3">
                <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} className="w-8 shadow-2" />
            </div>
            <div>
                <h4 className="mb-1">{product.name}</h4>
                <h6 className="mt-0 mb-3">${product.price}</h6>
                <Tag value={product.inventoryStatus} severity={severity[product.inventoryStatus] || null}></Tag>
                <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                    <Button icon="pi pi-search" className="p-button p-button-rounded" />
                    <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                </div>
            </div>
        </div>
    );
};

export default CarouselItemTemplate;
