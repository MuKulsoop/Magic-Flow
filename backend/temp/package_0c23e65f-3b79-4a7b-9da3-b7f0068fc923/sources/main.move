address 0x0 {
    module NFTCollection {
        use sui::object::UID;
        use sui::object::new_uid;
        use sui::event;
        use sui::tx_context::TxContext;
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
        ): NFT {
            let creator = TxContext::sender(ctx);
            let id = new_uid(ctx);
            let nft = NFT { id, name, description, url, creator };
            event::emit(NFTMinted { creator });
            nft
        }
    }
}