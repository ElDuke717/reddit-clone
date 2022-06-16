export const getPosts = async (prisma) => {
    const posts = await prisma.post.findMany({
        where: {},
        orderBy: [
            {
                id: 'desc',
            },
        ],
        include: {
            author: true,
        }
    })

    return posts
}

export const getSubreddit = async (name, prisma) => {
    return await prisma.subreddit.findUnique({
        where: {
            name,
        },
    })
}

export const getPostsFromSubreddit = async (subreddit, prisma) => {
    const posts = await prisma.post.findMany({
        where: {
            // this could have been subredditName: subreddit, but Prisma's filter on relations is used https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filter-on-relations=
            subreddit: {
                name: subreddit,
            },
        },
        orderBy: [
            {
                id: 'desc',
            },
        ],
        include: {
            author: true,
        },
    })

    return posts
}

export const getPost = async (id, prisma) => {
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            author: true,
            // comments are included here so that they can be pulled in with the posts. They are ordered by id and author info is included.
            comments: {
                orderBy: [
                    {
                        id: 'desc',
                    },
                ],
                include: {
                    author: true,
                },
            },
        },
    })

    return post
}

export const getVotes = async (post, prisma) => {
    const upvotes = await prisma.vote.count({
        where: {
            postId: post,
            up: true,
        },
    })
    const downvotes = await prisma.vote.count({
        where: {
            postId: post,
            up: false,
        },
    })

    return upvotes - downvotes
}

export const getVote = async (post_id, user_id, prisma) => {
    const vote = await prisma.vote.findMany({
        where: {
            postId: post_id,
            authorId: user_id,
        },
    })

    if (vote.length === 0) return null
    return vote[0]
}