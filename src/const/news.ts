const newsSources = {
    NEWSSOURCE1: { url: "www.exmaple1.com" },
    NEWSSOURCE2: { url: "www.exmaple2.com" },
    NEWSSOURCE3: { url: "www.exmaple3.com" },
} as const;

type NewsSources = keyof typeof newsSources;

export { newsSources, type NewsSources };