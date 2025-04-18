import { useState } from "react";
import { Container, Heading, VStack, Box, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react";
import { IProduct } from "../models/product.model";
import { useProductStore } from "../store/product";

function CreatePage() {
	const [newProduct, setNewProduct] = useState({
		name: '',
		price: 0,
		image: ''
	});
	const { createProduct } = useProductStore();
	const toast = useToast();
	const handleAddProduct = async (newProd: IProduct) => {
		console.log(`[mern-crash-course] handle add product with ${JSON.stringify(newProd)}`)
		const { success, message } = await createProduct(newProd);
		toast({
			title: success ? 'Success' : 'Error',
			description: message,
			status: success ? 'success' : 'error',
			isClosable: true,
			position: 'top-right'
		});
		setNewProduct({
			name: '',
			price: 0,
			image: ''
		});
	};
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
							price: parseInt(e.target.value || '0')
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
						onClick={() => { handleAddProduct(newProduct) }}
					>Add Product</Button>
				</VStack>
			</Box>
		</VStack>
	</Container>
}

export default CreatePage;
