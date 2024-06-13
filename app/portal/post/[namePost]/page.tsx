export default function Page({ params }: { params: { namePost: string } }) {
    return <div>My Post: {params.namePost}</div>
  }