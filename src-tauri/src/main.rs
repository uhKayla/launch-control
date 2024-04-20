#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;
use std::sync::Mutex;
use tauri::{command, State, Window};
use tokio_tungstenite::{connect_async, tungstenite::http::Request};
use futures::stream::StreamExt;
use url::Url;

struct AppState {
    server_url: Arc<Mutex<Option<String>>>,
    token: Arc<Mutex<Option<String>>>,
}

#[command]
async fn connect_websocket(state: State<'_, AppState>, window: Window) -> Result<(), String> {    let (url, token) = {
        let url_lock = state.server_url.lock().unwrap().clone();
        let token_lock = state.token.lock().unwrap().clone();
        (url_lock, token_lock)
    };

    if let (Some(mut base_url), Some(token)) = (url, token) {
        // Replace http or https with appropriate WebSocket protocols
        base_url = base_url.replace("http://", "ws://").replace("https://", "wss://");

        // Append the specific endpoint to the base URL
        let full_url = format!("{}/api/live/chat", base_url);

        let request = Request::builder()
            .uri(&full_url)
            .header("Authorization", format!("Bearer {}", token))
            .body(())
            .map_err(|e| e.to_string())?;

        match connect_async(request).await {
            Ok((mut ws_stream, _)) => {
                println!("WebSocket handshake has been successfully completed with headers");

                // Log every message received and emit it to the front end
                while let Some(message) = ws_stream.next().await {
                    match message {
                        Ok(msg) => {
                            let text_msg = msg.to_text().unwrap_or("[Binary data]");
                            println!("Received message: {}", text_msg);
                            // Emit the message to the frontend
                            window.emit("message_from_server", text_msg).expect("Failed to emit message");
                        },
                        Err(e) => {
                            println!("Error receiving message: {}", e);
                            break;
                        }
                    }
                }
                Ok(())
            },
            Err(e) => Err(e.to_string()),
        }
    } else {
        Err("URL or Token is missing".to_string())
    }
}

#[command]
fn save_server_info(state: State<AppState>, server_url: String, token: String) {
    let mut url = state.server_url.lock().unwrap();
    *url = Some(server_url);
    let mut tk = state.token.lock().unwrap();
    *tk = Some(token);
}

#[command]
fn get_server_info(state: State<AppState>) -> (Option<String>, Option<String>) {
    let url = state.server_url.lock().unwrap().clone();
    let token = state.token.lock().unwrap().clone();
    (url, token)
}

fn main() {
    tauri::Builder::default()
        .manage(AppState {
            server_url: Arc::new(Mutex::new(None)),
            token: Arc::new(Mutex::new(None)),
        })
        .invoke_handler(tauri::generate_handler![save_server_info, get_server_info, connect_websocket])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
