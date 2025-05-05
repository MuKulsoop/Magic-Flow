address 0x0 {
    module NFTCollection {
        use sui::object::UID;
        use sui::storage;
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

        struct NFTMinted has copy, drop, store {
            id: UID,
            creator: address
        }

        public fun mint_nft(
            name: String,
            description: String,
            url: String,
            ctx: &mut TxContext
        ) {
            let creator = TxContext::sender(ctx);
            let id = UID::new(ctx);
            let nft = NFT { id, name, description, url, creator };
            storage::save(&nft, &nft.id);
            event::emit(NFTMinted { id: nft.id, creator });
        }
    }
}