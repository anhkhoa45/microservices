import { model, Schema, Model, Document } from 'mongoose'
import { Password } from '../services/password'

interface UserAttrs {
    email: string
    password: string
}

interface UserDoc extends Document {
    email: string
    password: string
}

interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new Schema(
{
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        this.set('password', await Password.toHash(this.get('password')))
    }
    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = model<UserDoc, UserModel>('user', userSchema)

export { User }
