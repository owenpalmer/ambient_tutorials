section_1 = `
pub async fn main() -> ResultEmpty {
    Entity::new()
        .with_merge(make_transformable())
        .with_default(sun())
        .spawn();

    spawn_query((player(), user_id())).bind(move |players| {
        for (id, (_, user)) in players {
            let camera = Entity::new()
                .with_merge(make_perspective_infinite_reverse_camera())
                .with(lookat_center(), vec3(0., 0., 0.))
                .spawn();

        }
    });
}
`;