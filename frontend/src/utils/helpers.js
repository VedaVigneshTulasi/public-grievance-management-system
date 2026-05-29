export const formatStatus = status => {
  return status ? status.toString() : 'Unknown';
};

export const truncateText = (text, maxLength = 80) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
