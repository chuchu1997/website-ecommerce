import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, Package, AlertCircle } from 'lucide-react';
import { ProductInterface } from '@/types/product';
import ProductWrapperCard from '../ui/product/product-wrapper-card';

// Types
export interface ApiResponseProductScroll {
  products: ProductInterface[];
  hasMore: boolean;
  nextPage?: number;
  total?: number;
}

interface ScrollToLoadProductsProps {
  fetchProducts: (page: number, limit: number) => Promise<ApiResponseProductScroll>;
  itemsPerPage?: number;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: string, retry: () => void) => React.ReactNode;
  renderProduct?: (product: ProductInterface, index: number) => React.ReactNode;
  containerClassName?: string;
  gridClassName?: string;
  loadOffset?: number;
  onProductsLoaded?: (products: ProductInterface[], totalLoaded: number) => void;
  onError?: (error: string) => void;
}

export const ScrollToLoadProductsWithCategory: React.FC<ScrollToLoadProductsProps> = ({
  fetchProducts,
  itemsPerPage = 8,
  loadingComponent,
  errorComponent,
  renderProduct,
  containerClassName = '',
  gridClassName = '',
  loadOffset = 100,
  onProductsLoaded,
  onError,
}) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);

  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadProducts = useCallback(async (page: number, reset = false) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetchProducts(page, itemsPerPage);
      setProducts((prev) => (reset ? response.products : [...prev, ...response.products]));
      setHasMore(response.hasMore);
      setCurrentPage(page);

      const totalLoaded = reset
        ? response.products.length
        : products.length + response.products.length;
      onProductsLoaded?.(response.products, totalLoaded);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
      loadingRef.current = false;
      setInitialLoad(false);
    }
  }, [fetchProducts, itemsPerPage, products.length, onProductsLoaded, onError]);

  useEffect(() => {
    loadProducts(1, true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore && !error) {
          loadProducts(currentPage + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: `${loadOffset}px`,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadProducts, loading, hasMore, error, currentPage, loadOffset]);

  const retry = useCallback(() => {
    if (products.length === 0) {
      loadProducts(1, true);
    } else {
      loadProducts(currentPage + 1);
    }
  }, [loadProducts, products.length, currentPage]);

  const defaultRenderProduct = (product: ProductInterface, index: number) => (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {product.images[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <Package className={`w-12 h-12 text-gray-400 ${product.images ? 'hidden' : ''}`} />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );

  const defaultLoadingComponent = (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading products...</span>
    </div>
  );

  const defaultErrorComponent = (error: string, retryFn: () => void) => (
    <div className="flex flex-col items-center justify-center py-8">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-red-600 mb-4 text-center">{error}</p>
      <button
        onClick={retryFn}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  if (initialLoad && loading) {
    return (
      <div className={`w-full ${containerClassName}`}>
        {loadingComponent || defaultLoadingComponent}
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className={`w-full ${containerClassName}`}>
        {errorComponent
          ? errorComponent(error, retry)
          : defaultErrorComponent(error, retry)}
      </div>
    );
  }

  return (
    <div className={`w-full ${containerClassName}`}>
      {/* Products */}
      <ProductWrapperCard products={products} />

      {/* Loading More */}
      {loading && products.length > 0 && (
        <div className="mt-8">
          {loadingComponent || defaultLoadingComponent}
        </div>
      )}

      {/* Error While Loading More */}
      {error && products.length > 0 && (
        <div className="mt-8">
          {errorComponent
            ? errorComponent(error, retry)
            : defaultErrorComponent(error, retry)}
        </div>
      )}

      {/* No More Products */}
      {!hasMore && products.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Đã load hết sản phẩm</p>
        </div>
      )}

      {/* Empty State */}


      {/* Observer Target */}
      {hasMore && !error && (
        <div ref={observerRef} className="h-4" />
      )}
    </div>
  );
};
