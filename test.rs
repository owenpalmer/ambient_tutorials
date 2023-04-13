spawn_query(player()).bind(move |players| {
    for _ in players {
        Entity::new()
            .with_merge(make_transformable())
            .with_default(cube())
            .with(translation(), rand::random())
            .with(color(), rand::random())
            .spawn();
    }
})