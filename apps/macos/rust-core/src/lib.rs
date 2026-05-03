#[no_mangle]
pub extern "C" fn enterprise_core_health() -> i32 {
    1
}

pub fn health_label() -> &'static str {
    "rust-core-ready"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn health_label_is_stable() {
        assert_eq!(health_label(), "rust-core-ready");
    }
}
