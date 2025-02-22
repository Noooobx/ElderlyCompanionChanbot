import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const StoryContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  font-size: 22px;
  margin-bottom: 10px;
`;

const Content = styled.p`
  color: #555;
  font-size: 16px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const StoryComponent = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.quotable.io/random");
      console.log("API Response:", res.data); // Debugging

      setStory({ title: "Short Story", story: res.data.content });
    } catch (error) {
      console.error("Error fetching story:", error);
      setStory({ title: "Error", story: "Failed to load the story." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <StoryContainer>
      {loading ? (
        <p>Loading story...</p>
      ) : (
        story && (
          <>
            <Title>{story.title}</Title>
            <Content>{story.story}</Content>
            <Button onClick={fetchStory}>Get Another Story</Button>
          </>
        )
      )}
    </StoryContainer>
  );
};

export default StoryComponent;
