import { Image, Post, Revenue } from './definitions';

export const getImageUrlFromHeader = (dataPost : Image) => {    
  return dataPost.publicStorage ? `https://${dataPost?.storagePathURL}image/upload/${dataPost?.pathURL}`: 
      `https://drive.google.com/file/d/${dataPost?.pathURL}/preview`  
};

export const getWatermarkedImageUrl = (imageUrl : string) => {
  return `/api/watermark?imageUrl=${encodeURIComponent(imageUrl)}`;
};

export const getCategoyrUrl = (category : number) => {
  let cat = category == 1 ? "transporte-publico" : category == 2 ? "aviacao" : category == 3 ? "ferrovia" : category == 4 ? "automoveis" : category == 5 ? "post" : category == 6 ? "festividades" : category == 7 ? "natal" : category == 8 ? "religiao" : "post"

  return cat
};

export const getConvertUrl = (url : string) => {
  let cat = url == "transporte-publico" ? 1 : url == "aviacao" ? 2 : url == "ferrovia" ? 3  : url == "automoveis" ? 4 : url == "post" ? 5 : url == "festividades" ? 6 : url == "natal" ? 7 : url == "religiao" ? 8 : 0
  return cat
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
