const cats = ['Bijou', 'Mittens', 'Starry'];

export function calculateScore(responses) {
    let scoreMap = new Map(Array.from(cats, cat => [cat, 0]));
    for (const response of responses) {
        scoreMap.set(response, scoreMap.get(response) + 1);
    }
    let topScoreCat;
    let topScore = 0;
    for (const cat of scoreMap.keys()) {
        if (scoreMap.get(cat) > topScore) {
            topScoreCat = cat;
            topScore = scoreMap.get(cat);
        }
    }
    return topScoreCat;
}