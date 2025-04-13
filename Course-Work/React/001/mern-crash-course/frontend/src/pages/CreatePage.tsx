import { useState } from "react";
import { Container, Heading, VStack, Box, useColorModeValue, Input, Button } from "@chakra-ui/react";

function CreatePage() {
	const [newProduct, setNewProduct] = useState({
		name: '',
		price: 0,
		image: ''
	});
	return <Container maxW={'container.sm'}>
		<VStack spacing={8}>
			<Heading as={'h1'} size={'2xl'} textAlign={'center'} marginBottom={8}>
				Create New Product
			</Heading>
			<Box bg={useColorModeValue('white', 'gray.800')} p={6} w={'full'} rounded={'lg'} shadow={'md'}>
				<VStack spacing={4}>
					<Input
						placeholder="Product Name"
						name="name"
						value={newProduct.name}
						onChange={e => setNewProduct(np => ({
							...np,
							name: e.target.value
						}))}
					/>
					<Input
						placeholder="Product Price"
						name="price"
						value={newProduct.price}
						onChange={e => setNewProduct(np => ({
							...np,
							price: parseInt(e.target.value)
						}))}
					/>
					<Input
						placeholder="Product image"
						name="image"
						value={newProduct.image}
						onChange={e => setNewProduct(np => ({
							...np,
							image: e.target.value
						}))}
					/>
					<Button
						colorScheme="blue" w="full"
						onClick={() => {
							console.log(newProduct);
						}}>Add Product</Button>
				</VStack>
			</Box>
		</VStack>
	</Container>
}

export default CreatePage;
