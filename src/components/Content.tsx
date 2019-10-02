import React, { useEffect, useState } from 'React';
import { Body, Card, CardItem, Content, Left, Text } from 'native-base';
import { NEWS_API_KEY } from '../constants';
import { Article } from '../types';

export default () => {
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const headlinesUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

      try {
        const response = await fetch(headlinesUrl);
        const data = await response.json();
        setNewsArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Content padder>
      {newsArticles.map(article => (
        <Card
          key={article.url}
          style={{ marginBottom: 15, marginLeft: 15, marginRight: 15 }}
        >
          <CardItem>
            <Left>
              <Body>
                <Text style={{ marginBottom: 15 }}>Title: {article.title}</Text>
                <Text style={{ marginBottom: 15 }}>
                  Description: {article.description}
                </Text>
                <Text style={{ marginBottom: 15 }}>
                  Published: {article.publishedAt}
                </Text>
                <Text style={{ marginBottom: 15 }}>Article: {article.url}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      ))}
    </Content>
  );
};
