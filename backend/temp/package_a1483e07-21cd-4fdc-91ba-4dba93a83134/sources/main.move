address 0x0 {
    module NFTCollection {
        use sui::object::{UID, new};
        use sui::tx_context::{self, TxContext};
        use sui::event;
        use std::string::String;

        struct NFT has key, store {
            id: UID,
            name: String,
            description: String,
            url: String,
            creator: address
        }

        struct NFTMinted has store {
            creator: address
        }

        public fun mint_nft(
            name: String,
            description: String,
            url: String,
            ctx: &mut TxContext
        ) {
            let creator = tx_context::sender(ctx);
            let id = new(ctx);
            let nft = NFT { id, name, description, url, creator };
            event::emit(NFTMinted { creator });
        }
    }
}