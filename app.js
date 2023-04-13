document.addEventListener('DOMContentLoaded', () => {

const codeElement = document.getElementById('editor');
const hljs = window.hljs;

const codeExamples = {
    'section-1': `use rand::Rng;
    use ambient_api::{
        global::{time, frametime, Quat},
        components::core::{
            app::{main_scene, window_physical_size},
            physics::{
                character_controller_height, character_controller_radius, physics_controlled,
                plane_collider, box_collider, visualizing, dynamic,
            },
        },
        player::KeyCode,
        concepts::{make_transformable, make_perspective_infinite_reverse_camera},
        physics::{raycast_first, raycast},
    };
    
    #[main]
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
    
        messages::Input::subscribe(|source, msg| {
            let Some(player_id) = source.client_entity_id() else { return; };
    
            let camera_id = entity::get_component(player_id, player_camera_ref()).unwrap();
            let player_pos = entity::get_component(player_id, translation()).unwrap();
            let camera_pos = entity::get_component(camera_id, translation()).unwrap();

            if msg.wasd_delta {
                set_animation("Running");
            }
    
            if msg.w {
                move_character(-Vec3::Y)
            }
            if msg.a {
                move_character(-Vec3::X)
            }
            if msg.s {
                move_character( Vec3::Y)
            }
            if msg.d {
                move_character( Vec3::X)
            }
        });
    
        OkEmpty
    }
    `,
    'section-2': 'fn main() {\n    print_message("Hello, world!");\n}\n\nfn print_message(message: &str) {\n    println!("{}", message);\n}',
    'section-3': 'fn main() {\n    print_message("Welcome to the tutorial!");\n}\n\nfn print_message(message: &str) {\n    println!("{}", message);\n}',
    'section-4': `spawn_query(player()).bind(move |players| {
        for _ in players {
            Entity::new()
                .with_merge(make_transformable())
                .with_default(cube())
                .with(translation(), rand::random())
                .with(color(), rand::random())
                .spawn();
        }
    });`,
};

const updateCode = (sectionId) => {
    if (codeExamples[sectionId]) {
        codeElement.textContent = codeExamples[sectionId];
        hljs.highlightElement(codeElement);
    }
};

const findVisibleSection = () => {
    const halfScreenHeight = window.innerHeight * .25;
    const headers = document.querySelectorAll('h2');
    let visibleSection = null;
    let maxTop = -Infinity;

    headers.forEach((header) => {
        const rect = header.getBoundingClientRect();
        if (rect.top < halfScreenHeight && rect.top > maxTop) {
            maxTop = rect.top;
            visibleSection = header;
        }
    });

    return visibleSection;
};

const onScroll = () => {
    const visibleSection = findVisibleSection();
    if (visibleSection) {
        updateCode(visibleSection.id);
    }
};

document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
});

document.querySelector('.tutorial').addEventListener('scroll', onScroll);

// Initialize the code editor with the first section
updateCode('section-1');

});
