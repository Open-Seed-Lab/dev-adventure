import { Container, Heading, Text, VStack, SimpleGrid, Button } from '@chakra-ui/react';
import { useProductStore } from "../store/product";
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useEffect } from 'react';

function HomePage() {
	const { products, getProducts } = useProductStore();
	useEffect(() => {
		getProducts()
	}, [getProducts])
	return <Container maxW={'container.xl'} py={12}>
		<VStack spacing={8}>
			<Heading as={'h1'} size={'2xl'} textAlign={'center'} marginBottom={8}>
				Current Products 🚀
			</Heading>
			{(!products || products.length === 0) && <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
				No Products Found 😢 {' '}
				<Link to={'/create'}>
					<Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
						Create A Product
					</Text>
				</Link>
			</Text>}
			<SimpleGrid
				columns={{
					base: 1, md: 2, lg: 3
				}}
				spacing={10}
				w={'full'}
			>
				{products.map(pdt => (<ProductCard product={pdt} />))}
			</SimpleGrid>
		</VStack>
	</Container>
}

export default HomePage;
