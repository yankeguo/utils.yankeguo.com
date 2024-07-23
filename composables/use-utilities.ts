export function useUtilitiesSummary() {
  const results: Array<{
    group: string;
    items: Array<{
      title: string;
      route: { name: string };
      desc: string;
    }>;
  }> = [];

  const groups: Record<
    string,
    Array<{ title: string; route: { name: string }; desc: string }>
  > = {};

  const router = useRouter();

  router.getRoutes().forEach((route) => {
    const {
      utilityGroup,
      utilityTitle,
      utilityDescription,
    }: {
      utilityGroup?: string;
      utilityTitle?: string;
      utilityDescription?: string;
    } = route.meta as any;

    if (utilityDescription && utilityGroup && utilityTitle) {
      if (!groups[utilityGroup]) {
        groups[utilityGroup] = [];
      }
      groups[utilityGroup].push({
        title: utilityTitle,
        route: { name: route.name?.toString() as string },
        desc: utilityDescription,
      });
    }
  });

  for (const group of Object.keys(groups)) {
    results.push({ group, items: groups[group] });
  }

  return results;
}
