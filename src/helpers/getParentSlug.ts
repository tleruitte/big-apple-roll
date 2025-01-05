const getParentSlug = (slug: string | null | undefined): string | undefined => {
  if (!slug) {
    return undefined;
  }

  const index = slug.lastIndexOf("/", slug.length - 2) + 1;
  return index > 0 ? slug.substring(0, index) : slug;
};

export default getParentSlug;
