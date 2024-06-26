// Update this page (the content is just a fallback if you fail and example)
import { useState } from "react";
import { Container, Text, VStack, Textarea, Button, Box, Spinner } from "@chakra-ui/react";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBulkSearch = async () => {
    setLoading(true);
    const queries = input.split("\n").filter(query => query.trim() !== "");
    const apiKey = "YOUR_WHODAT_API_KEY"; // Replace with your actual Whodat API key
    const delay = 1000; // 1 second delay between API calls

    const fetchResult = async (query) => {
      const response = await fetch(`https://api.whodat.com/search?query=${query}&amp;apiKey=${apiKey}`);
      const data = await response.json();
      return data;
    };

    const results = [];
    for (const query of queries) {
      const result = await fetchResult(query);
      results.push(result);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    setResults(results);
    setLoading(false);
  };
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Bulk Search</Text>
        <Textarea
          placeholder="Enter search queries, one per line"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="md"
        />
        <Button onClick={handleBulkSearch} colorScheme="blue" isDisabled={loading}>
          {loading ? <Spinner size="sm" /> : "Search"}
        </Button>
        <Box width="100%" mt={4}>
          {results.map((result, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={2}>
              <Text>{JSON.stringify(result)}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
